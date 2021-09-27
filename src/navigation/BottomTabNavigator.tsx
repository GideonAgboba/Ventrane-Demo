import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';
import {Colors} from '../constants';
import ProfileSvg from '../assets/images/profile.svg';
import SettingsSvg from '../assets/images/settings.svg';
import useColorScheme from '../hooks/useColorScheme';
import LottieView from 'lottie-react-native';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  return (
    <Tab.Navigator
      initialRouteName="TabTwo"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
        inactiveTintColor: Colors[colorScheme].tabIconDefault,
        style: {
          backgroundColor: Colors[colorScheme].background,
          height: 60,
          flexDirection: 'row',
          paddingBottom: 8,
        },
      }}>
      <Tab.Screen
        name="TabOne"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <ProfileSvg width={25} height={25} fill={color} size={25} />
          ),
        }}
        component={TabOneNavigator}
      />
      <Tab.Screen
        name="TabTwo"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color}) => (
            <LottieView
              style={styles.addIcon}
              source={require('../assets/animations/AddButton.json')}
              colorFilters={[
                {
                  keypath: 'oo',
                  color,
                },
                {
                  keypath: 'o11',
                  color,
                },
                {
                  keypath: 'o12',
                  color,
                },
                {
                  keypath: '椭圆 1',
                  color,
                },
                {
                  keypath: 'jia',
                  color: Colors.white,
                },
                {
                  keypath: 'o13',
                  color,
                },
              ]}
              autoPlay
              loop
            />
          ),
        }}
        component={TabTwoNavigator}
      />
      <Tab.Screen
        name="TabThree"
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color}) => (
            <SettingsSvg width={25} height={25} fill={color} size={25} />
          ),
        }}
        component={TabThreeNavigator}
      />
    </Tab.Navigator>
  );
}

const TabOneStack = createStackNavigator();
function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        options={{
          headerTitle: 'Profile',
        }}
        name="Profile"
        component={Profile}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator();
function TabTwoNavigator() {
  const colorScheme = useColorScheme();
  return (
    <TabTwoStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors[colorScheme].background,
        },
        headerTitleStyle: {fontSize: 18},
        headerTintColor: Colors[colorScheme].text,
        headerShown: true,
      }}>
      <TabTwoStack.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={Home}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator();
function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        options={{
          headerTitle: 'Settings',
        }}
        name="Settings"
        component={Settings}
      />
    </TabThreeStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addIcon: {
    height: 200,
    width: 200,
    transform: [
      {
        scale: 1.4,
      },
    ],
  },
});
