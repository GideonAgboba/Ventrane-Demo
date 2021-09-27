import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Text, Button} from '../../../components/Themed';
import {Colors} from '../../../constants';
import ProfileSvg from '../../../assets/images/profile.svg';
import SearchSvg from '../../../assets/images/search.svg';
import {scale} from 'react-native-size-matters';

export default function Header({location}) {
  return (
    <SafeAreaView style={[styles.row]}>
      <View style={{flex: 1}}>
        <View style={styles.row}>
          <View style={{flex: 0}}>
            <ProfileSvg
              width={40}
              height={40}
              fill={Colors.primary}
              size={40}
            />
          </View>
          <View style={{flex: 1, marginLeft: 5}}>
            <Text style={styles.location}>{location || '...'}</Text>
            <Text style={styles.name}>Agboba Gideon</Text>
          </View>
        </View>
      </View>
      <View style={{flex: 0}}>
        <Button
          lightColor={Colors.white}
          darkColor={Colors.white}
          style={styles.search}>
          <SearchSvg width={15} height={15} fill={Colors.primary} size={15} />
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  location: {
    fontSize: scale(12),
    opacity: 0.8,
    marginBottom: -3,
  },
  name: {
    fontSize: scale(14),
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  search: {
    shadowColor: Colors.primary,
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 24,
    width: scale(35),
    height: scale(35),
    paddingHorizontal: 0,
    justifyContent: 'center',
  },
});
