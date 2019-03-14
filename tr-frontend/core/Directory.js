import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default class Directory extends React.Component {
  static navigationOptions = {
    title: 'Directory'
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Directory</Text>
      </View>
    );
  }
}
