import React from 'react';
import { ScrollView, SectionList, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

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
            return (
                <TouchableHighlight style={{ flex: 1 }} onPress={this.handleTouch}>
                    <View style={styles.diContainerHome}>
                        <Text style={styles.diHomeName}>
                            {this.props.item._doc.name} | {Math.floor(this.props.item.distance)} km
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