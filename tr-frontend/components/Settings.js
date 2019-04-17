import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Settings extends React.Component {
    static navigationOptions = {
        title: "Settings",
        headerStyle: {
            backgroundColor: "#4B9CD3",
        },
        headerTintColor: "white",
    }

    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center", padding: 10}}>
              <Text>Settings</Text>
            </View>
        );
    }
}