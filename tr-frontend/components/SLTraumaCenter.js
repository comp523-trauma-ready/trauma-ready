// SectionList Trauma Center entry

import React from 'react';
import { Button, Text, View } from 'react-native';

export default class SLTraumaCenter extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    let {name, code, distance} = this.props.center; 
    let buttonTitle = name + " | " + code + " | " + distance;
    return (
      <Button 
        style={this.props.style} 
        title={buttonTitle} 
        onPress={() => this.props.navigation.navigate('TraumaCenter', {name: name, code: code, distance: distance})}
      />
    );
  }
}