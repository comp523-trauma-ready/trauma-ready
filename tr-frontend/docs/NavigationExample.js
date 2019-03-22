import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'

const Temp1 = (props) => (
  <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
    <Text>hello, world</Text>
    <Button 
      title="Go to secondary"
      onPress={() => props.navigation.navigate("S1")}
    />
  </View>
);

const Temp2 = (props) => (
  <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
    <Text>stack pt 2</Text>
  </View>
);

const Temp3 = (props) => (
  <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
    <Text>stack pt 3</Text>
    <Button
      title="Go to secondary v2"
      onPress={() => props.navigation.navigate("S2")}
    />
  </View>
);

const Temp4 = (props) => (
  <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
    <Text>stack pt 4</Text>
  </View>
);

const AppNavigatorP1 = createStackNavigator({
  P1: Temp1, 
  S1: Temp2,
});

const AppNavigatorP2 = createStackNavigator({
  P2: Temp3,
  S2: Temp4,
});

const TabNavigator = createBottomTabNavigator({
  PM: AppNavigatorP1,
  SM: AppNavigatorP2,
});

export default createAppContainer(TabNavigator);