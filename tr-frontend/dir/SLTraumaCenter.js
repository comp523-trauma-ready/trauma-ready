// SectionList Trauma Center entry

import React from 'react';
import { Text, View } from 'react-native';

export default class SLTraumaCenter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const style = {
      padding: 10,
      backgroundColor: this.props.backgroundColor, // alternate b/w white or lightgray for better display
    }

    return (
      <View style={style}>
        <Text>
          {this.props.centerName} | {this.props.activationCode}
        </Text>
      </View>
    );
  }
}

