import React from 'react';
import { Button, Text, View } from 'react-native';

export default class TraumaCenter extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    let routeParams = this.props.navigation.state.params;
    let {name, code, distance} = routeParams;
    return (
      <View>
        <Text>{name}</Text>
        <Text>{code}</Text>
        <Text>{distance}</Text>
      </View>
    );
  }
}