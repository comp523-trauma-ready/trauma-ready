import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Button, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'

import Home from './components/Home';
import Directory from './components/Directory';
import Search from './components/Search';
import Settings from './components/Settings';

const HomeStack = createStackNavigator({Home: Home});
const DirectoryStack = createStackNavigator({Directory: Directory});
const SearchStack = createStackNavigator({Search: Search});
const SettingsStack = createStackNavigator({Settings: Settings})

const TabNavigator = createBottomTabNavigator(
    {
        Home: HomeStack,
        Directory: DirectoryStack,
        Search: SearchStack,    
        Settings: SettingsStack,
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
                } else if (routeName === "Settings") {
                    iconName = `ios-settings`          
                } else if (routeName === "Directory") {
                    iconName = `ios-list`;
                }
                return (<IconComponent name={iconName} size={25} color={tintColor} />);
            }
        }),
        swipeEnabled: true, 
        tabBarOptions: {
            // Keep the default now, but can be updated for different contrast settings later
            // activeTintColor: 'blue',
            // inactiveTintColor: 'gray',
        }
    },
);

export default createAppContainer(TabNavigator);
