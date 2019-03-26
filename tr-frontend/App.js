import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Button, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'

import Home from './components/Home';
import Directory from './components/Directory';
import SearchTab from './components/SearchTab';
import TraumaCenter from './components/TraumaCenter';

const HomeStack = createStackNavigator({Home: Home});
const DirectoryStack = createStackNavigator({Directory: Directory, TraumaCenter: TraumaCenter});

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Search: SearchTab,    
    Directory: DirectoryStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state; 
        let IconComponent = Ionicons; 
        let iconName; 
        if (routeName === "Home") {
          iconName = `ios-home`;
        } else if (routeName === "Search") {
          iconName = `ios-search`;
        } else if (routeName === "Directory") {
          iconName = `ios-list`;
        }
        return (<IconComponent name={iconName} size={25} color={tintColor} />);
      }
    }),
    tabbarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }
  },
);

export default createAppContainer(TabNavigator)