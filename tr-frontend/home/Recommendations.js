import React from 'react';
import { FlatList, Text, View } from 'react-native';
import RecommendedCard from './RecommendedCard'

// Note: structure of this component is likely to change. as we define the 
// data model and integrate with geoservices

// Needs to load in and provide the list of recommended centers, presented in the 
// form of RecommendedCards, based on user location. This will likely require 
// hits to both a location service and the backend to cross-reference the user's 
// location with nearby trauma centers. 

// Using Fetch
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

export default class Recommendations extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Find location
    // Find trauma centers nearby 
    // Update state
  }

  render() {
    // Sample data returned by backend 
    let targetTraumaCenters = [
      {
        id: 0,
        name: "UNC Hospitals",
        activation: "red",
        distance: "5 miles", 
        route: "/dir/0",
      }, 
      { 
        id: 1,
        name: "UNC Hospitals",
        activation: "yellow",
        distance: "5 miles", 
        route: "/dir/1",        
      },
      {
        id: 2,
        name: "DukeMed",
        activation: "red",
        distance: "14 miles", 
        route: "/dir/2",
      },
      {
        id: 3,
        name: "Cape Fear",
        activation: "red",
        distance: "40 miles", 
        route: "/dir/3",        
      },
    ];

    let cardViews = targetTraumaCenters.map((tc) => 
      <RecommendedCard key={tc.id} name={tc.name} distance={tc.distance} />
    );

    return (
      <View style={this.props.style}>
        <Text style={{margin: 6, fontSize: 18}}>
          Recommendations
        </Text>

        {cardViews}
        
      </View>
    );
  }
}



