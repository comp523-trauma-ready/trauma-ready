import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

// A hospital listing item in both the directory tab and the home page preview. 
// props:
//  item: Hospital object
//  navigation: RN navigation object

export default class DirectoryItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleTouch = this.handleTouch.bind(this);
  }

  handleTouch(touchEvent) {
    this.props.navigation.navigate({
      routeName: "Hospital",
      params: {
        item: this.props.item,
      }
    });
  }

  render() {
    const item = this.props.item;
    // If it contains a distance field, this component is on the home screen
    if (item.distance) {
      const milesPerKilometer = 0.6213;
      const distance = Math.floor(milesPerKilometer * item.distance);  
      const formattedDistance = (distance == 0) ? "<1 mile" : String(distance) + " miles";
      return (
        <TouchableHighlight style={{ flex: 1 }} onPress={this.handleTouch}>
          <View style={styles.diContainerHome}>
            <Text style={styles.diHomeName}>
              {item.name} | {formattedDistance}
            </Text>
          </View>
        </TouchableHighlight>
      );
    } else {
      return (
        <TouchableHighlight onPress={this.handleTouch}>
          <View style={styles.diContainer}>
            <Text style={styles.diTitle}>{item.name}</Text>
          </View>
        </TouchableHighlight>
      );
    }
  }
}

const styles = StyleSheet.create({
  diContainer: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#619acf",
    backgroundColor: "white",
  },

  diTitle: {
    fontSize: 18,
    height: "100%",
  },

  diContainerHome: {
    flex: 1,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    margin: 4,
    backgroundColor: "white",
  },
});