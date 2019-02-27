import React from 'react';
import { Text, View } from 'react-native';
import Search from '../home/Search';
import Recommendations from '../home/Recommendations';

export default class Home extends React.Component {
  render() {
    return (
      <View>
        <Search />
        <Recommendations />
      </View>
    );
  }
}
