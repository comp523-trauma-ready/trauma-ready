import React from "react";
import { Linking, ScrollView, StyleSheet, Text, View } from "react-native";

// This dependency can be replaced in the future by Expo SDK MapViews
import MapView from "react-native-maps"; 

import ActivationItem from "./ActivationItem";

// This component is the profile screen for an entire hospital. It renders 
// information like addresses, emails, phones, activations, services, and a map. 
// Almost all of this data is passed in on the "item" parameter from navigation 
// and then stored in state, except for activation items which query the backend
// upon an initial load. 

export default class Hospital extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("item").name,
      headerStyle: {
        backgroundColor: "#4B9CD3",
      },
      headerTintColor: "white",
    }
  }

  constructor(props) {
    super(props);
    this.state = this.props.navigation.getParam("item");
    this.state.activationCodes = [];
  }

  componentDidMount() {
    const baseURL = "http://statt-portal.herokuapp.com/mobile/rac/";
    fetch(baseURL + this.state.rac)
      .then(res => res.json())
      .then(json => {
        this.setState({ activationCodes: json });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.h1}>{this.state.name}</Text>
          <Text>{this.state.address}</Text>
          <Text>{this.state.email}</Text>
        </View>
        <Text style={styles.h2}>Phones</Text>
        <View style={styles.phones}>
          {
            this.state.phoneDirectory.map((entry, key) => {
              const type = entry.connection;
              const number = entry.number;
              return (
                <Text key={key} style={{
                  fontSize: 14,
                  marginTop: 4,
                  marginBottom: 4,
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderRadius: 4,
                  padding: 8,
                }}>
                  {type}:
                  <Text
                    style={{
                      color: "blue",
                      textDecorationLine: "underline",
                      paddingLeft: 4
                    }}
                    onPress={(event) => Linking.openURL(`tel:${number}`)}>
                    {number}
                  </Text>
                </Text>
              );
            })
          }
        </View>
        <Text style={styles.h2}>Activations</Text>
        <View style={styles.activations}>
          {
            this.state.activationCodes.map((code, key) =>
              <ActivationItem
                navigation={this.props.navigation}
                key={key}
                id={code.aid}
                code={code.code}
              />
            )
          }
        </View>
        <Text style={styles.h2}>Maps</Text>
        <View style={styles.maps}>
          <MapView
            loadingEnabled={true}
            loadingBackgroundColor={"#eeeeee"}
            style={{ ...StyleSheet.absoluteFillObject }}
            initialRegion={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.922,
              longitudeDelta: 0.0421,
            }}>
            <MapView.Marker
              title={this.state.name}
              coordinate={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
              }}
              onPress={(event) => { }}
            />
          </MapView>
        </View>
        <View style={styles.services}>
          <Text style={styles.h2}>Services</Text>
          {
            this.state.services.map((service, key) =>
              <Text key={key}>{service}</Text>
            )
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },

  header: {
    alignItems: "center",
    justifyContent: "center",
  },

  phones: {
    padding: 8,
    borderWidth: 1,
    marginBottom: 8,
    backgroundColor: "lightgray",
  },

  activations: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 8,
  },

  maps: {
    height: 100,
    borderWidth: 1,
    padding: 8,
    marginBottom: 8,
  },

  services: {
  },

  h1: {
    fontSize: 28,
    paddingLeft: 12,
    paddingRight: 12,
    fontWeight: "bold",
  },

  h2: {
    fontSize: 22,
    paddingTop: 4,
    paddingBottom: 4,
    fontWeight: "bold"
  },
});