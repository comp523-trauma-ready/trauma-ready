import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './common/Header';
import Footer from './common/Footer';
import Home from './core/Home';

export default class App extends React.Component {
  render() {
    return (
      <View>
        <Header title={"Trauma Ready"} image={"./assets/unc-healthcare.png"} />
        <Home />
        <Footer />
      </View>
    );
  }
}