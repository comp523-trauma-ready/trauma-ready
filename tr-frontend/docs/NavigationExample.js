import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createMaterialBottomTabNavigator } from 'react-navigation'

import Header from './common/Header';
import Footer from './common/Footer';
import Search from './home/Search';
import Recommendations from './home/Recommendations';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home",
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: "Details",
     headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
        color="#fff"
      />
    ),
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.push('Details')}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go to Settings"
          onPress={() => this.props.navigation.navigate('Settings')}
        />
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Settings"
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Details: DetailsScreen,
});

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
  Details: DetailsScreen,
});

// export default createAppContainer(createBottomTabNavigator(
//   {
//     Home: HomeStack,
//     Settings: SettingsStack,
//   },
//   {
//     // Nada
//   }
// ));

const RootStack = createBottomTabNavigator(
  {
    Home: HomeStack,
    Settings: SettingsStack,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return (
      <AppContainer />    
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
  }, 
  header: {
    height: 130,
    backgroundColor: "#4B9CD3",
  },
  search: {
    height: 175,
  },
  recommendations: {
    height: 285,
    backgroundColor: "lightgray",
    borderColor: "gray",
    borderWidth: 1,
  }, 
  footer: {
    height: 75,
    backgroundColor: "lightgray",
  }
});
