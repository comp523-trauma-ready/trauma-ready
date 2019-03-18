import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import Search from '../home/Search';
import Recommendations from '../home/Recommendations';

export default class Home extends React.Component {
  static navigationOptions = {
    title: "Trauma Ready"
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: "space-between"}}>
        <Search style={{flex: 1}}/>
        <Recommendations style={{flex: 1, backgroundColor: "lightgray", borderColor: "gray", borderWidth: 1}}/>
      </View>
    );
  }
}

