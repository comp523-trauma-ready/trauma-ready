import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Masthead from './Masthead';
import Recommendations from './Recommendations';
import Search from './Search';

export default class Home extends React.Component {
  static navigationOptions = {
    title: "Home",

    headerStyle: {
      backgroundColor: "#4B9CD3",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    },  
  }

  constructor(props) {
    super(props);
  }  

  render() {
    return (
      <View style={styles.wrapper}>
        <Masthead style={styles.masthead} />
        <Search style={styles.search} />
        <Recommendations style={styles.recommendations} />
      </View>
    );
  }
}

//==================================================================================================

const styles = StyleSheet.create({
  wrapper: {
    flex: 1, 
    justifyContent: "center",
    alignItems: "stretch",
    padding: 10,
  }, 
  masthead: {
    flex: 1, 
    justifyContent: "center",
    alignItems: "center",
    borderColor: "lightgray",
    borderWidth: 1,
    marginBottom: 10,
  },
  search: {
    flex: 1, 
    justifyContent: "center",
    alignItems: "stretch",
    borderColor: "lightgray",
    borderWidth: 1,
    marginBottom: 10,
  },
  recommendations: {
    flex: 4, 
    justifyContent: "center",
    alignItems: "center",
    borderColor: "lightgray",
    borderWidth: 1,
    marginTop: 10,
  },
});