import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'

import Card from './core/Card';
import Center from './core/Center';
import Directory from './core/Directory';
import Home from './core/Home';

const HomeStack = createStackNavigator({ 
  Home: Home,
}, {
  initialRouteName: "Home",
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#4B9CD3',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
});

const DirStack = createStackNavigator({
  Directory: Directory
});

const BottomNav = createBottomTabNavigator({
  Home: HomeStack, 
  Directory: DirStack,
});

const AppContainer = createAppContainer(BottomNav);

export default class App extends React.Component {
  render() {
    return (
      <AppContainer />    
    );
  }
}

