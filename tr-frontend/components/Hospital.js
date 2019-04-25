import React from 'react';
import { ScrollView, SectionList, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import MapView from 'react-native-maps';
import ActivationItem from './ActivationItem';

// The profile page for an entire hospital. Displays information for contacts, services, and
// activations in a hierarchical list. Majority of data is static and passed in via props; the
// only true state that is involved is for tracking the user's location for integration with maps.

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
        // header
        // phones
        // activations
        // maps
        // services
        return (
            <ScrollView contentContainerStyle={styles.wrapper}>
                <View style={styles.header}>
                    <Text style={styles.h1}>{this.state.name}</Text>
                    <Text>{this.state.address}</Text>
                    <Text>{this.state.email}</Text>
                </View>
                <View style={styles.phones}>
                    {
                        this.state.phoneDirectory.map((entry, key) => {
                            let info = entry.connection.split(":");
                            let type = info[0];
                            let number = info[1];
                            return (
                                <Text key={key}>{type}: {number}</Text>
                            );
                        })
                    }
                </View>
                <View style={styles.activation}>
                    <Text style={styles.h2}>Activations</Text>
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
                <View style={styles.maps}>
                    <Text style={styles.h2}>Maps</Text>
                </View>
                <View style={styles.services}>
                    <Text style={styles.h2}>Services</Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flexGrow: 1,
        justifyContent: "space-between",
        borderWidth: 1,
    },

    header: {
        flex: 1, 
        borderWidth: 1, 
        alignItems: "center",
        justifyContent: "center",
    },

    phones: {
        flex: 1,
        borderWidth: 1, 

    }, 

    activations: {
        flex: 7,
        borderWidth: 1, 
        padding: 8,
    },

    maps: {
        flex: 3,
        borderWidth: 1, 
    }, 

    services: {
        flex: 1,
        borderWidth: 1, 

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


// <Text style={styles.hospitalName}>{this.state.name}</Text>
// <View style={styles.infoWrapper}>
//     <Text style={styles.info}>{this.state.address}</Text>
//     <Text style={styles.info}>{this.state.email}</Text>
// </View>
// {
//     this.state.phoneDirectory.map((item, key) => {
//         let info = item.connection.split(":");
//         console.log(info);
//         // let type = info[0];
//         // let number = info[1];
//         // console.log(type, number);
//         return (<Text key={key}>{item.connection}</Text>)
//     })
// }
// <View style={styles.activationWrapper}>
//     <Text style={styles.h2}>Activations</Text>
//     {
//         this.state.activationCodes.map((code, index) =>
//             <ActivationItem
//                 navigation={this.props.navigation}
//                 key={index}
//                 id={code.aid}
//                 code={code.code}
//             />)
//     }
// </View>
// <View style={styles.servicesWrapper}>
//     <Text style={styles.h2}>Services</Text>
//     {
//         this.state.services.map((service, index) =>
//             <Text key={index} style={styles.services}> - {service} </Text>
//         )
//     }
// </View>

// {
// <View style={styles.mapWrapper}>
//     <MapView
//         loadingEnabled = {true}
//         loadingIndicatorColor="#666666"
//         loadingBackgroundColor="#eeeeee"
//         style={styles.map}
//         initialRegion={{
//             latitude: this.state.latitude,
//             longitude: this.state.longitude,
//             latitudeDelta: 0.922,
//             longitudeDelta: 0.0421,
//         }}>
//         <MapView.Marker
//             title={this.state.name}
//             coordinate={{
//                 latitude : this.state.latitude,
//                 longitude : this.state.longitude
//             }}
//             onPress={(nativeEvent) => {}}
//             description={"Will prompt for opening actual maps app eventually"}
//         />
//     </MapView>
// </View>
// }

// const styles = StyleSheet.create({
//     areaWrapper: {
//         flex: 1,
//         padding: 10,
//         flexDirection: "column",
//         justifyContent: "space-between",
//     },

//     hospitalName: {
//         fontSize: 24,
//         fontWeight: "bold",
//         fontStyle: "italic",
//         textAlign: "center",
//         color: "#4B9CD3",

//     },

//     infoWrapper: {
//         flex: 0.5,
//         marginTop: 0,
//         paddingTop: 2,
//         paddingBottom: 6,
//         marginBottom: 6,
//         borderColor: "white",
//         borderWidth: 2,
//         borderRadius: 25,
//         backgroundColor: "white",
//     },

//     info: {
//       textAlign: "center",
//       color: "#4B9CD3",
//     },

//     mapWrapper: {
//         flex: 2,
//     },

//     map: {
//         ...StyleSheet.absoluteFillObject,
//         borderRadius: 10
//     },

//     activationWrapper: {
//         flex: 4,
//         borderRadius: 10,
//         justifyContent: "space-between",
//     },

//     h2: {
//         fontSize: 22,
//         marginTop: 8,
//         marginBottom: 8,
//         color: "#4B9CD3",
//         fontWeight: "bold",
//     },

//     activationItem: {
//         fontSize: 18,
//         marginTop: 4,
//         marginBottom: 4,

//         padding: 8,
//         backgroundColor: "#ffe10a",
//         fontWeight: "bold",
//     },

//     servicesWrapper: {
//         flex: 1,
//     },

//     red: {
//         backgroundColor: "#d10000"
//     },

//     services: {
//         fontSize: 16,
//         paddingLeft: 16,
//     },
// });
