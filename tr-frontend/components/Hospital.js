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
        // These object schemas must be cleaned up 
        let hname = this.props.navigation.state.params.data.data.hname;
        let address = this.props.navigation.state.params.data.data.address;
        let email = this.props.navigation.state.params.data.data.email;
        return (
            <View>
                <Text>{hname}</Text>
                <Text>{address}</Text>
                <Text>{email}</Text>
            </View>
        );
    }
}