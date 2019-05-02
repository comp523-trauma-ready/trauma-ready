import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { IntentLauncherAndroid, Location, Permissions } from "expo";

import DirectoryItem from "./DirectoryItem";

export default class Home extends React.Component {
  static navigationOptions = {
    title: "Trauma Ready",
    headerStyle: {
      backgroundColor: "#4B9CD3",
    },
    headerTintColor: "white",
  }

  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      traumaCenters: [],
      otherHospitals: [],
      errorMessage: "",
    }
  }

  componentWillMount() {
    // Request location permissions from user and then store the results in state. 
    // On some Androids there is an issue with this Promise never resolving, 
    // so we apply some platform specific logic to get around that. 
    //   ** Full discussion: https://github.com/expo/expo/issues/436.
    if (Platform.OS === 'ios') {
      this._getLocationAsync();
    } else {
      let locationStatus = Location.getProviderStatusAsync();
      locationStatus.then(response => {
        let { locationServicesEnabled, gpsAvailable } = response;
        if (!(locationServicesEnabled && gpsAvailable)) {
          IntentLauncherAndroid.startActivityAsync(
            IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
          );
        }
        this._getLocationAsync();
      });
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({ errorMessage: "Unable to access user location" });
    }

    let location = await Location.getCurrentPositionAsync({ 
      enableHighAccuracy: true 
    });

    this.setState({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    });

    // Given the lat/long coordinates, we ask the backend for nearby hospitals
    const { latitude, longitude } = this.state;

    const baseURL = "https://statt-portal.herokuapp.com/mobile/hospitals/full/";
    fetch(baseURL + latitude + "/" + longitude)
      .then(res => res.json())
      .then(hospitals => {

        // Converts this array into just Hospital documents with distance appended
        hospitals = hospitals.map((entry) => {
          let newEntry = entry._doc;
          newEntry['distance'] = entry['distance'];
          return newEntry;
        });

        // Next, distinguish between trauma centers and acute care hospitals
        let traumaCenters = [];
        let otherHospitals = [];

        hospitals.forEach((hospital, key) => {
          const traumaLevel = parseInt(hospital.traumaLevel);
          if (isNaN(traumaLevel)) {
            otherHospitals.push(hospital);
          } else {
            traumaCenters.push(hospital);
          }
        });

        // Lastly, sort each array by distance before storing in state
        const sortFunction = (a, b) => a.distance < b.distance ? -1 : 1;
        traumaCenters.sort(sortFunction);
        otherHospitals.sort(sortFunction);

        this.setState({
          traumaCenters: traumaCenters,
          otherHospitals: otherHospitals,
        });
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.masthead}>
          {/* Mid Carolina RAC logo*/}
          <Image style={styles.image} source={require("../assets/logo.jpg")} />
        </View>
        <View style={styles.info}>
          <Text style={styles.h2}>Trauma Centers</Text>
          {
            this.state.traumaCenters.map((traumaCenter, key) => {
              return (
                <DirectoryItem
                  key={key}
                  item={traumaCenter}
                  navigation={this.props.navigation}
                />
              )
            })
          }
          <Text style={styles.h2}>Other Hospitals</Text>
          {
            this.state.otherHospitals.map((hospital, key) => {
              return (
                <DirectoryItem
                  key={key}
                  item={hospital}
                  navigation={this.props.navigation}
                />
              )
            })
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },

  locationBanner: {
    flex: 1,
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
  },

  masthead: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    margin: 24,
  },

  info: {
    flex: 12,
    padding: 12,
    borderWidth: 2,
    borderRadius: 4,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 12,
    borderColor: "gray",
    backgroundColor: "lightgray",
  },

  topBar: {
    flex: .75,
    alignItems: "center",
    padding: 0,
  },

  topInnerBar: {
    flex: 1,
    width: 300,
    borderRadius: 15,
    alignItems: "center",
    backgroundColor: "#4B9CD3",
    height: "100%",
  },

  headline: {
    top: 6,
    width: "100%",
    fontSize: 14,
    textAlign: "center",
    fontStyle: "italic",
    color: "white"
  },

  h1: {
    fontSize: 28,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
  },

  h2: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 4,
    marginBottom: 4,
    textAlign: "center",
  },
});