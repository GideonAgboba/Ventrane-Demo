import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  PermissionsAndroid,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {View, Text} from '../../components/Themed';
import {Colors, Styles} from '../../constants';
import Header from './layouts/Header';
import Geolocation from '@react-native-community/geolocation';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import Geocoder from 'react-native-geocoder';
import Cards from './layouts/Cards';
import Service from './layouts/Service';
import Transactions from './layouts/Transactions';

const NO_LOCATION_PROVIDER_AVAILABLE = 2;
const PERMISSION_DENIED = 3;
const CARDS = [
  {
    title: 'current balance', // could be bank name
    year: '28',
    month: '10',
    cvv: '123',
    number: '1234123412341234',
    holder: 'agboba taiwo joshua',
    currency: 'usd',
    balance: '3048.75',
    priColor: Colors.warning,
    secColor: Colors.warninglight,
  },
  {
    title: 'current balance', // could be bank name
    year: '28',
    month: '10',
    cvv: '123',
    number: '1234123412341234',
    holder: 'agboba kehinde gideon',
    currency: 'ngn',
    balance: '248000.00',
    priColor: Colors.blue,
    secColor: Colors.lightblue,
  },
  {
    title: 'current balance', // could be bank name
    year: '28',
    month: '10',
    cvv: '123',
    number: '1234123412341234',
    holder: 'henry chase',
    currency: 'usd',
    balance: '1200.00',
    priColor: Colors.info,
    secColor: Colors.infolight,
  },
];
const TRANSACTIONS = [
  {
    title: 'dribble',
    body: 'payment recived',
    amount: '245',
    status: 'error',
  },
  {
    title: 'google wallet',
    body: 'payment via wallets can be done',
    amount: '180',
    status: 'success',
  },
  {
    title: 'uplabs',
    body: 'payment recived',
    amount: '137',
    status: 'pending',
  },
];

export default function Home({navigation}) {
  const [location, setLocation] = useState('...');
  const [locError, setLocError] = useState({
    status: false,
    error: '',
  });

  useEffect(() => {
    // did mount
    requestDeviceLocationRuntimePermission();
    return () => {
      // unmount
    };
  }, []);

  const requestDeviceLocationRuntimePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'Ventrane App needs access to your location',
          buttonPositive: 'Allow',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getDeviceLocation();
      } else {
        setLocError({
          status: true,
          error: 'Allow "Location Permission" to use this feature',
        });
      }
    } catch (err) {
      setLocError({
        status: true,
        error: 'Opps! There was an issue getting location permission',
      });
    }
  };

  const getDeviceLocation = () => {
    try {
      Geolocation.stopObserving();
    } catch (error) {}

    Geolocation.getCurrentPosition(
      async position => {
        const {latitude, longitude} = position.coords;
        const cords = {
          lat: latitude,
          lng: longitude,
        };

        Geocoder.geocodePosition(cords)
          .then(res => {
            setLocation(res[0].formattedAddress);
          })
          .catch(error => {
            setLocError({
              status: true,
              error: 'Opps! Could not format device cordinates',
            });
          });
      },
      error => {
        if (error.code === NO_LOCATION_PROVIDER_AVAILABLE) {
          setLocError({
            status: true,
            error: 'Turn on your location to use this feature',
          });
        } else if (error.code == PERMISSION_DENIED) {
          setLocError({
            status: true,
            error: 'Allow "Location Permission" to use this feature',
          });
        } else {
          setLocError({
            status: true,
            error: 'Opps! Something went wrong finding your current location',
          });
        }
      },
      {enableHighAccuracy: false},
    );
  };

  if (locError?.status) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>{locError?.error}</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            if (Platform.OS === 'android') {
              LocationServicesDialogBox.checkLocationServicesIsEnabled({
                message:
                  '<h2>Allow/On Location?</h2> \
                  This app needs to change your device settings<br/><br/>\
                  Use GPS for location<br/><br/>',
                ok: 'Allow',
                cancel: 'Deny',
              })
                .then(() => {
                  requestDeviceLocationRuntimePermission();
                })
                .catch(() => {});
            }
          }}
          style={{paddingVertical: 10}}>
          <Text
            style={{
              textAlign: 'center',
              color: Colors.primary,
            }}>
            Retry Now?
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        nestedScrollEnabled
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <Header location={location} />
        <Cards cards={CARDS} />
        <Service navigation={navigation} />
        <Transactions navigation={navigation} data={TRANSACTIONS} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Styles.body.paddingHorizontal,
    paddingVertical: Styles.body.paddingVertical,
    backgroundColor: Colors.white,
  },
});
