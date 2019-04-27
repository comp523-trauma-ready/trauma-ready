import React from 'react';
import { ScrollView, SectionList, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

// A hospital listing item in both the directory tab and the home page preview. 
// props:
//  item: Hospital object
//  navigation: RN navigation object

export default class DirectoryItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleTouch = this.handleTouch.bind(this);
    }

    handleTouch(touchEvent) {
        this.props.navigation.navigate({
            routeName: "Hospital",
            params: {
                item: this.props.item,
            }
        });
    }

    render() {
        if (this.props.item.distance) {
            const milesAway = Math.floor(0.6213 * this.props.item.distance); // 0.6213 converts from km
            const formattedDistance = (milesAway == 0) ? "<1 mile" : String(milesAway) + " miles";
            return (
                <TouchableHighlight style={{ flex: 1 }} onPress={this.handleTouch}>
                    <View style={styles.diContainerHome}>
                        <Text style={styles.diHomeName}>
                            {this.props.item._doc.name} | {formattedDistance} 
                        </Text>
                    </View>
                </TouchableHighlight>
            );            
        }
        return (
            <TouchableHighlight onPress={this.handleTouch}>
                <View style={styles.diContainer}>
                    <Text style={styles.diTitle}>{this.props.item.name}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    diContainer: {
        flex: 1,
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#619acf",
        backgroundColor: "white",
    },

    diTitle: {
        fontSize: 18,
        height: "100%",
    },

    diContainerHome: {
        flex: 1,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        margin: 4,
        backgroundColor: "white",
    },

    diHomeName: {
    },

    diHomeDistance: {

    },
});