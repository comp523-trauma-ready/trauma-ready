import React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';

import SLTraumaCenter from './SLTraumaCenter';

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
    this.state = {
      locationServicesError: false, 
      databaseError: false,
      userLocation: '',
      watchID: -1,
      sectionData: [
        {title: 'C', data: [{name: 'Cape Fear', distance: 40, code: 'Yellow'}]},
        {title: 'U', data: [
          {name: 'UNC Hospitals', distance: 5, code: 'Red'},
          {name: 'UNC Hospitals', distance: 5, code: 'Yellow'},
        ]},
      ],
    };
  }  

  isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  // Get user location data, then send it to backend to get active directory data
  componentDidMount() {
    // This will prompt for location permissions upon opening the directory tab, however it would be 
    // more ideal if these permissions were acquired immediately after app launch (as it would be 
    // annoying in the middle of a medical evauation). This library is supposedly a solution to this:
    //  https://github.com/yonahforst/react-native-permissions
    // 
    // Also, navigator is not enabled by default on Android. Will have to look into handling 
    // permissions for them eventaully. 
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        let {accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed} = pos.coords;
        let {timestamp} = pos.timestamp;
        let locString = ("lat: " + latitude + " | long: " + longitude);
        console.log(locString);
        this.setState({userLocation: locString});
      }, 
      (err) => {
        if (!this.isEmptyObject(err)) {
          console.error(err);
          this.setState({locationServicesError: true});
        }
      }, 
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    let wid = navigator.geolocation.watchPosition(
      (newPos) => {
        // This should be refactored to a function to avoid repeating same logic as above
        let {latitude, longitude} = newPos.coords;
        let locString = ("lat: " + latitude + " | long: " + longitude);
        this.setState({userLocation: locString});
      },
      (err) => {
        if (!this.isEmptyObject(err)) {
          console.error(err);
          this.setState({locationServicesError: true});
        }
      },
      {distanceFilter: 100, enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    this.setState({watchID: wid});

    // Placeholder url and request body
    // JSON.stringify called on location services data structure 
    const url = "https://jsonplaceholder.typicode.com/todos/1";
    const reqBody = {method: "POST", body: JSON.stringify({})}
    fetch(url, reqBody)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        // validate response 
        // this.setState({sectionData: json});
      })
      .catch(err => {
        if (!this.isEmptyObject(err)) {
          console.error(err);
          this.setState({databaseError: err});
        }
      })
  }


  componentWillUnmount() {
    // Not sure if these two calls are redundant yet 
    navigator.geolocation.clearWatch(this.state.watchID);
    navigator.geolocation.stopObserving();
  }

  render() {
    if (this.state.locationServicesError) {
      // Handle err rendering
    }
    return (
      <View style={styles.container}>
        <Text style={styles.primaryHeader}>Trauma Centers</Text>
        <SectionList 
          sections={this.state.sectionData}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          renderItem={({item}) => (
            <SLTraumaCenter style={styles.item} navigation={this.props.navigation} center={item}/>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  primaryHeader: {
    paddingTop: 4,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 8,
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});