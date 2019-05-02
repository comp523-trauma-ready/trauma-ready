import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { 
  createStackNavigator, 
  createAppContainer, 
  createBottomTabNavigator 
} from 'react-navigation'

import Activation from './components/Activation';
import Directory from './components/Directory';
import Home from './components/Home';
import Hospital from './components/Hospital';

// Entry component for the app. Sets up tab bar navigation and the stack routes 
// for each screen. For more information on navigators: 
//  ** https://reactnavigation.org/docs/en/tab-based-navigation.html

const HomeStack = createStackNavigator({ Home: Home });
const DirectoryStack = createStackNavigator({
  Directory: Directory,
  Hospital: Hospital,
  Activation: Activation,
});

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Directory: DirectoryStack,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === "Home") {
          iconName = `ios-home`;
        } else if (routeName === "Directory") {
          iconName = `ios-list`;
        }
        return (<IconComponent name={iconName} size={25} color={tintColor} />);
      }
    }),
  }
);

export default createAppContainer(TabNavigator);