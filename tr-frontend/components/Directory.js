import React from 'react';
import { View, Text } from 'react-native';

export default class Directory extends React.Component {
  static navigationOptions = {
    title: "Directory",
    headerStyle: {
      backgroundColor: "#4B9CD3",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  }

  constructor(props) {
    super(props);
  }  

  render() {
    return (
      <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <Text>Directory</Text>
      </View>
    );
  }
}