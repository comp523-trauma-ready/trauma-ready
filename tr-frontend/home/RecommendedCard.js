import React from 'react';
import { Text, View } from 'react-native';

export default class RecommendedCard extends React.Component {
  render() {
    return (
      <View style={{
        borderWidth: 1,
        backgroundColor: "white",
        margin: "1%",
        padding: "2%",
      }}>
        <Text>{this.props.name} | {this.props.distance}</Text>
      </View>
    );
  }
}
