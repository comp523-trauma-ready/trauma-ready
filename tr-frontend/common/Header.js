import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={this.props.style}>
        <Text 
          style={{
            color: "white", 
            fontSize: 36, 
            position: "absolute", 
            bottom: 12, 
            left: 6,
          }}>
          {this.props.title}
        </Text>
      </View>
    );
  }
}

