import React from 'react';
import { ScrollView, SectionList, StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

// The profile page for an entire hospital. Displays information for contacts, services, and 
// activations in a hierarchical list. Majority of data is static and passed in via props; the only 
// state involved is for tracking the user's location for integration with maps. 

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
    }

    // TODO: Implement backend endpoint that fetches activation data by RAC name. 
    componentDidMount() {}

    render() {  
        return (
            <ScrollView contentContainerStyle={styles.areaWrapper}>
                <Text style={styles.hospitalName}>{this.state.name}</Text>
                <View style={styles.infoWrapper}>
                    <Text style={styles.info}>{this.state.address}</Text>
                    <Text style={styles.info}>{this.state.email}</Text>
                </View>
                <View style={styles.mapWrapper}>
                    <MapView
                        loadingEnabled = {true}
                        loadingIndicatorColor="#666666"
                        loadingBackgroundColor="#eeeeee"
                        style={styles.map}
                        initialRegion={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            latitudeDelta: 0.922, 
                            longitudeDelta: 0.0421,
                        }}>
                        <MapView.Marker
                            title={this.state.name}
                            coordinate={{ 
                                latitude : this.state.latitude, 
                                longitude : this.state.longitude 
                            }}
                            onPress={(nativeEvent) => {
                                console.log(nativeEvent);
                            }}
                            description={"Will prompt for opening actual maps app eventually"}
                        />
                    </MapView>
                </View>
                <View style={styles.activationWrapper}>
                    <Text style={styles.activations}>Activations</Text>
                </View>
                <View style={styles.servicesWrapper}>
                    <Text style={styles.services}>Services</Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    areaWrapper: {
        flex: 1,
        padding: 10,
        flexDirection: "column",
        justifyContent: "space-around",
    },

    hospitalName: {
        fontSize: 24,
        fontWeight: "bold",
    },

    infoWrapper: {
        flex: 0.5,
        marginTop: 8,
        marginBottom: 8,
    }, 

    info: {
    },

    mapWrapper: {
        flex: 2,
    },

    map: {
        ...StyleSheet.absoluteFillObject
    },

    activationWrapper: {
        flex: 4,
    },

    activations: {
        fontSize: 18,
        marginTop: 8,
    },

    servicesWrapper: {
        flex: 1,
    },

    services: {
        fontSize: 18,
        marginTop: 8,
    },
});