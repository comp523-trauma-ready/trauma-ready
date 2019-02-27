import React from 'react';
import { Text, View } from 'react-native';

export default class RecommendedCard extends React.Component {
  render() {
    return (
      <View>
        <Text>shit</Text>
        <Text>{this.props.name} | {this.props.distance}</Text>
      </View>
    );
  }
}
