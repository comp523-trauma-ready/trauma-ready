import React from 'react';
import { FlatList, Text, View } from 'react-native';
import RecommendedCard from './RecommendedCard'

// Needs to load in and provide the list of recommended centers, presented in the 
// form of RecommendedCards, based on user location. This will likely require 
// hits to both a location service and the backend to cross-reference the user's 
// location with nearby trauma centers. 

export default class Recommendations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      traumaCenters: [],
    }
  }

  componentDidMount() {
    // Find location

    // Find trauma centers nearby 

    // Update state
  }

  render() {
    // This object should reflect the structure of our json api 
    let sampleTraumaCenters = [
      {
        name: "UNC Hospitals",
        location: "xxx",
        distance: "10 miles",
        id: 0,
      },
      {
        name: "DukeMed",
        location: "xxx",
        distance: "15 miles",
        id: 1,
      },
      {
        name: "Cape Fear",
        location: "xxx",
        distance: "48 miles",
        id: 2
      },
    ];

    return (
      <View>
        <Text>Recommendations</Text>
        <FlatList 
          data = {sampleTraumaCenters}
          renderItem = {(val) => {<RecommendedCard name={val.name} distance={val.distance} />}}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
