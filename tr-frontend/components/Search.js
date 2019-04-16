import React from 'react';
import { Text, View } from 'react-native';

export default class Search extends React.Component {
    static navigationOptions = {
        title: "Search",
        headerStyle: {
            backgroundColor: "#4B9CD3",
        }
    };

    constructor(props) {
        super(props);
    }  

    render() {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center", padding: 10}}>
              <Text>Search</Text>
            </View>
        );
    }
}