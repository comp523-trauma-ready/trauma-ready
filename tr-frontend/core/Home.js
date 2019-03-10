import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'

import Header from '../common/Header';
import Footer from '../common/Footer';
import Search from '../home/Search';
import Recommendations from '../home/Recommendations';

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <Header style={styles.header} title={"Trauma Ready"}/>
        <Search style={styles.search} />
        <Recommendations style={styles.recommendations} />
        <Footer style={styles.footer} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
  }, 
  header: {
    height: 130,
    backgroundColor: "#4B9CD3",
  },
  search: {
    height: 175,
  },
  recommendations: {
    height: 285,
    backgroundColor: "lightgray",
    borderColor: "gray",
    borderWidth: 1,
  }, 
  footer: {
    height: 75,
    backgroundColor: "lightgray",
  }
});