import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ActivationItem from "./ActivationItem";
import DirectoryItem from "./DirectoryItem";

export default class Home extends React.Component {
    static navigationOptions = {
        title: "Home",
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
            locString: "",
            nearby: [], // [{id:id, code:code}]
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (success) => {
                let { latitude, longitude } = success.coords;
                this.setState({ latitude : latitude, longitude : longitude });
                const nearbyUrl = "https://statt-portal.herokuapp.com/mobile/hospitals/full/"
                    + latitude + "/" + longitude;
                fetch(nearbyUrl)
                    .then(res => res.json())
                    .then(json => this.setState({ nearby : json }))
                    .catch(err => console.error(err));
            },
            (failure) => console.error(failure),
            { timeout: 10, maximumAge: 10, enableHighAccuracy: false }
        );
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.masthead}>
                    <Text style={styles.h1}>Trauma Ready</Text>
                </View>
                <View style={styles.topBar}>
                  <View style={styles.topInnerBar}>
                      <Text style={styles.headline}>
                          <Text style={{fontWeight: "bold"}}>Location:</Text> Chapel Hill, NC
                      </Text>
                  </View>
                </View>
                <View style={styles.nearby}>
                    <Text style={styles.h2}>Nearby</Text>
                    {
                        this.state.nearby.map((item, index) => {
                            return (
                                <DirectoryItem style={styles.di} key={index} navigation={this.props.navigation} item={item} />
                            );
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
        backgroundColor: "white",
    },

    masthead: {
        flexDirection: "row",
        alignItems: "center",
        margin: 8,
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

    nearby: {
        flex: 11,
        margin: 12,
        padding: 12,
        borderWidth: 3,
        borderRadius: 25,
        borderColor: "#4B9CD3",
        backgroundColor: "white"
    },

    h1: {
        fontSize: 28,
        fontWeight: "bold",
        width: "100%",
        color: "#4B9CD3",
        textAlign: "center",
        fontStyle: "italic",
    },

    h2: {
        fontSize: 22,
        fontWeight: "bold",

        color: "#4B9CD3",
        marginTop: 4,
        marginBottom: 4,
        marginLeft: 10,
    },
});
