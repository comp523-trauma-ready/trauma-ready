import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ActivationItem from "./ActivationItem";

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
        // navigator.geolocation.getCurrentPosition(
        //     (successObj) => { 
        //         let { latitude, longitude } = successObj;
        //         const nearbyEndpoint = "https://comp523-statt-web-portal.herokuapp.com/mobile/hospitals/" + latitude + "/" + longitude;
        //         fetch(nearbyEndpoint)
        //             .then(res => res.json())
        //             .then(json => this.setState({ nearby : json }))
        //             .catch(err => console.error(err));
        //         this.setState({ latitude : latitude, longitude : longitude });
        //         console.log(this.state);
        //     },
        //     (failObj) => { 
        //         console.error(failObj) 
        //     },
        //     { // Request options: https://facebook.github.io/react-native/docs/geolocation
        //         timeout : 10, 
        //         maximumAge: 10, 
        //         enableHighAccuracy : false 
        //     },
        // );
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.masthead}>
                    <Text style={styles.h1}>Trauma Ready</Text>
                </View>
                <View style={styles.topBar}>
                    <Text style={styles.headline}>
                        <Text style={{fontWeight: "bold"}}>Location:</Text> Chapel Hill, NC
                    </Text>
                </View>
                <View style={styles.nearby}>
                    <Text style={styles.h2}>Nearby</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },

    masthead: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        margin: 8,
    },

    topBar: {
        flex: 0.5,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        padding: 4,
        backgroundColor: "khaki",
    },

    headline: {
        width: "100%",        
        textAlign: "center",
    },

    nearby: {
        flex: 11,
        margin: 12,
        padding: 12,
        borderWidth: 1,
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
    },
});