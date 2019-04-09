import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Home extends React.Component {
    static navigationOptions = {
	title: "Trauma Ready",
    }

    constructor(props) {
	super(props);
    }

    componentDidMount() {
	
        // const url = "http://localhost:3000/sample";
        // fetch(url)
        //     .then(res => res.json())
        //     .then(json => console.log(JSON.stringify(json, null, 2)));
        
        // If first time opening, prompt for location permissions 
        // let watchId = navigator.geolocation.watchPosition(
        //     /* success */ (pos) => {
        //      let {latitude, longitude} = pos.coords;
        //      console.log(pos);
        //      this.setState({latitude: latitude, longitude: longitude});
        //     }, 
        //     /* failure */ (err) => { 
        //      console.error(err);
        //     }, 
        //     /* options */ {timeout: 1000, enableHighAccuracy: true}
        //);
    }

    render() {
        return (
            <View style={styles.container}>
              <View style={styles.subcontainer}>
                <Text style={styles.h2}>Alerts</Text>
                <Text style={styles.p}>None</Text>
              </View>

              <View style={styles.subcontainer}>
                <Text style={styles.h2}>Location</Text>
                <Text style={styles.p}>Chapel Hill, NC | Orange County</Text>
              </View>

              <View style={styles.subcontainer}>
                <Text style={styles.h2}>Weather</Text>
                <Text style={styles.p}></Text>
              </View>

              <View style={[styles.subcontainer, {flex: 2}]}>
                <Text style={styles.h2}>Nearby</Text>
                <Text style={styles.p}></Text>
              </View>

              <View style={[styles.subcontainer, {flex: 2}]}>
                <Text style={styles.h2}>Recent</Text>
                <Text style={styles.p}></Text>
              </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        margin: 10,
        padding: 10,
        borderWidth: 0.3,
        borderColor: "black",
    },
    subcontainer: {
        borderWidth: 0.3,
        borderColor: "black",
        padding: 4,
        margin: 4,
    },
    h1: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 4,
        marginBottom: 4,
    },
    h2: {
        fontSize: 18,    
        marginTop: 4,
        marginBottom: 4,
    },
    p: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
    },
});
