import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
  }  

  render() {
    return (
      <View style={this.props.style}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search by hospital or symptoms"
          onChangeText={(text) => console.log(text)}
        />
      </View>
    );
  }
}

//==================================================================================================

const styles = StyleSheet.create({
  searchBar: {
    height: 40,
    padding: 10,
    borderWidth: 2,
    borderColor: "gray"
  },
});