import React from "react";
import { 
    Linking, ScrollView, SectionList, StyleSheet, 
    Text, TouchableHighlight, View 
} from "react-native";

import MapView from "react-native-maps";
import ActivationItem from "./ActivationItem";

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
        if (this.state._doc) {
            this.state = this.state._doc;
        }
        this.state.activationCodes = [];
    }

    componentDidMount() {
        const baseActivationEndpoint = "http://statt-portal.herokuapp.com/mobile/rac/";
        fetch(baseActivationEndpoint + this.state.rac)
            .then(res => res.json())
            .then(json => {
                this.setState({ activationCodes : json });
                console.log(this.state);
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
                            let info = entry.connection.split(":");
                            let type = info[0];
                            let number = info[1];
                            return (
                                <Text key={key} style={{
                                    marginTop: 8, 
                                    marginBottom: 8, 
                                    backgroundColor: "white",
                                    borderWidth: 1,
                                    borderRadius: 2,
                                    padding: 2,
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
                            onPress={(event) => {}}
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
        marginBottom: 8
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