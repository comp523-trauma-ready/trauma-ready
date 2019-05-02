import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

// A stylized list component for displaying available activation codes
// props:
//  @navigation :: React Navigation Item
//  @key        :: Number
//  @id         :: Number, number that corresponds to the backend id
//  @code       :: Activation codename (e.g. "Adult Red")

export default class ActivationItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleTouch = this.handleTouch.bind(this);
  }

  handleTouch(touchEvent) {
    this.props.navigation.navigate({
      routeName: "Activation",
      params: {
        id: this.props.id,
      }
    });
  }

  render() {
    const codename = this.props.code.toLowerCase();
    const isRed = codename.includes("red") || codename.includes("alpha");
    return (
      <TouchableHighlight onPress={this.handleTouch}>
        <Text 
          style={[styles.activationItem, isRed && styles.red]} 
          key={this.props.aid}
        >
          {this.props.code}
        </Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  activationItem: {
    fontSize: 18,
    marginTop: 4,
    marginBottom: 4,
    padding: 8,
    borderWidth: 3,
    borderColor: "#bca607",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#ffe10a",
    fontWeight: "bold",
    textAlign: "center",
  },

  red: {
    backgroundColor: "#d10000",
    borderColor: "#680000",
    color: "white"
  },
});