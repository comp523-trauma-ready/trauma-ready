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
    container: {
        flex: 1,
        padding: 10
    },

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
    },

    sectionHeader: {
        fontSize: 24,
        fontWeight: "bold",
        backgroundColor: "lightgray",
        padding: 2,
    },
});
