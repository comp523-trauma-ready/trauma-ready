import React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';

// The profile page for an entire hospital. Displays information for contacts, services, and 
// activations in a hierarchical list. Majority of data is static and passed in via props; the only 
// state involved is for tracking the user's location for integration with maps. 

export default class Hospital extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
        }
    }

    render() {
        console.log(this.props);
        return (
            <View>
                <Text>{this.props.navigation.state.params.name}</Text>
            </View>
        );
    }
}