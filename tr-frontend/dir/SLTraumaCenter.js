// SectionList Trauma Center entry

import React from 'react';
import { Button, Text, View } from 'react-native';

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
        <Button 
          title={this.props.centerName  + ' | ' + this.props.activationCode}
          // onPress={(item) => this.props.navigation.navigate('Item')}
          onPress={(item) => alert(item)}
        />
      </View>
    );
  }
}

