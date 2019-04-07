import React from 'react';
import { Text, View } from 'react-native';

export default class Search extends React.Component {
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
