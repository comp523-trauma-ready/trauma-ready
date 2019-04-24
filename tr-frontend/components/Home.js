import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { Constants, Location, Permissions } from "expo";

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
            latitude: "",
            longitude: "",
            errorMessage: "",
        }
    }

    componentWillMount() {
        this._getLocationAsync();
    }

    componentDidMount() {
        // const apiKey = "";
        // Location.setApiKey(apiKey);
        // this._getReverseGeocodedLocation();
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== "granted") {
            this.setState({ errorMessage: "Permission to access location was denied"});
        }
        // Requests location with accuracy to the nearest kilometer. Other settings are here:
        //  https://docs.expo.io/versions/latest/sdk/location/#locationaccuracy
        let location = await Location.getCurrentPositionAsync({ accuracy : Location.Accuracy.Low });
        this.setState({ latitude : location.coords.latitude, longitude : location.coords.longitude });
    }

    // _getReverseGeocodedLocation = async () => {
    //     if (this.state.latitude && this.state.longitude) {
    //         let { city, street, region, postalCode } = await Location.reverseGeocodeAsync({
    //             latitude : this.state.latitude, longitude : this.state.longitude,
    //         });
    //         this.setState({ city : city, region : region, postalCode : postalCode });
    //     }
    // }

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.locationBanner}>
                    <Text style={{ fontWeight: "bold" }}>Your location: </Text>
                </View>
                <View style={styles.masthead}>
                    <Image style={styles.image} source={require("../assets/logo.jpg")} />
                </View>
                <View style={styles.info}>
                    <Text style={styles.h2}>Trauma Centers</Text>
                    <Text style={styles.h2}>Other Hospitals</Text>
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
        marginLeft: 10,
    },
});