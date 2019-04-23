import React from 'react';
import { ScrollView, SectionList, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

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
            console.log(this.props.item._doc.name, this.props.item.distance);
                return (
                    <TouchableHighlight style={{ flex: 1 }} onPress={this.handleTouch}>
                        <View style={styles.diContainerHome}>
                            <Text style={styles.diTitleHome}>{this.props.item._doc.name} | {Math.floor(this.props.item.distance)} km</Text>
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
        margin: 4, 
        padding: 12,
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
    },

    diTitleHome: {
        flex: 1,
        fontSize: 14,
        height: 84,
        justifyContent: "space-evenly",        
    }
});