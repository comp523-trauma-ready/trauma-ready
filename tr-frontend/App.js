import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Button, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'

import Home from './components/Home';
import Directory from './components/Directory';
import Search from './components/Search';

const StandardComponent = (props) => (
  <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
    <Text>standard component</Text>
  </View>
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: Home,
    Search: Search,    
    Directory: Directory,
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