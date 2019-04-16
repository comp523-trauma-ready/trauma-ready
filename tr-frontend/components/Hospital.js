import React from 'react';
import { ScrollView, SectionList, StyleSheet, Text, View } from 'react-native';

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

    componentDidMount() {
        console.log(this.state);
        // Fetch activation data
        // const activationEndpoints = this.state.

        // "https://comp523-statt-web-portal.herokuapp.com/activations/0";

    }

    render() {  
        return (
            <ScrollView>
                <View style={styles.sectionWrapper}>
                    <Text style={styles.hospitalName}>{this.state.name}</Text>
                    <View style={styles.sectionWrapper}>
                        <Text>{this.state.address}</Text>
                        <Text>{this.state.email}</Text>
                    </View>
                    <View style={styles.sectionWrapper}>
                        <Text style={styles.sectionHeader}>Map</Text>
                    </View>
                    <View style={styles.sectionWrapper}>
                        <Text style={styles.sectionHeader}>Activations</Text>
                    </View>
                    <View style={styles.sectionWrapper}>
                        <Text style={styles.sectionHeader}>Services</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    hospitalName: {
        fontSize: 24,
        fontWeight: "bold",
    },

    sectionWrapper: {
        padding: 10,
    },

    sectionHeader: {
        fontSize: 18,
    },
});