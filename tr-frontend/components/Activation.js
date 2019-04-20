import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default class Activation extends React.Component {
        static navigationOptions = ({ navigation }) => {
        return {
            title: "Activation",
            headerStyle: {
                backgroundColor: "#4B9CD3",
            },
            headerTintColor: "white",
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.navigation.getParam("id"),
            data: {name: "", rac: "", trauma: [], notes: ""},
        }
    }

    componentDidMount() {

        console.log(this.state.id);
        const activationEndpoint = "https://statt-portal.herokuapp.com/activations/" + this.state.id;
        fetch(activationEndpoint)
            .then(res => res.json())
            .then(json => {
                console.log(json);
                this.setState({ data : json })
            }
            )
            .catch(err => console.error(err));
    }

    render() {
        let { name, rac, trauma, notes } = this.state.data;
        const isRed = name.toLowerCase().includes("red");
        return (
            <ScrollView style={[styles.wrapper, isRed && styles.red]}>
                <Text style={styles.h1}>{name}</Text>
                <Text style={styles.h2}>{rac}</Text>
                {trauma.map((t, index) => <Text style={styles.listItem} key={index}>{t}</Text>)}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "yellow",
        padding: 6,
    },

    red: {
        backgroundColor: "red",
    },

    h1: {
        fontSize: 32,
        fontWeight: "bold",
        marginTop: 2,
        marginBottom: 2,
    }, 

    h2: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 2,
        marginBottom: 2,
    }, 

    listItem: {
        fontSize: 14,
        backgroundColor: "white",
        padding: 12,
        marginTop: 2,
        marginBottom: 2,
        borderWidth: 2,
    },
});