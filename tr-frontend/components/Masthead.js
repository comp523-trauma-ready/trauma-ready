import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Masthead extends React.Component {
  constructor(props) {
    super(props);
  }  

  render() {
    return (
      <View style={this.props.style}>
        <Text>Masthead</Text>
      </View>
    );
  }
}