import React from 'react';
import { ScrollView, SectionList, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

// A stylized list component for displaying available activation codes 
// props: 
//  @navigation :: React Navigation Item
//  @key        :: Number
//  @id         :: Number, number that corresponds to the backend id
//  @code       :: Activation codename (e.g. "Adult Red")

export default class ActivationItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleTouch = this.handleTouch.bind(this);
    }

    handleTouch(touchEvent) {
        this.props.navigation.navigate({
            routeName: "Activation",
            params: {
                id: this.props.id,
            }
        });
    }

    render() {
        const isRed = this.props.code.toLowerCase().includes("red");
        return (
            <TouchableHighlight onPress={this.handleTouch}>
                <Text style={[styles.activationItem, isRed && styles.red]} key={this.props.aid}>
                    {this.props.code}
                </Text>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    activationItem: {
        fontSize: 18,
        borderWidth: 2,
        marginTop: 4,
        marginBottom: 4,
        padding: 8,
        backgroundColor: "yellow",
        fontWeight: "bold",
    },

    red: {
        backgroundColor: "red"
    },
});