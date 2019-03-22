import React from 'react';
import { View, Text } from 'react-native';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
  }  

  render() {
    return (
      <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <Text>Search</Text>
      </View>
    );
  }
}