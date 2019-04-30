import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

// Renders an individual activation card... essentially a digital recreation of the paper version.
// Navigated to by clicking an ActivationItem from a hospital screen. 
// Props: 
//  @navigation: RN navigation object

export default class Activation extends React.Component {
        static navigationOptions = {
            title: "Activation",
            headerStyle: {
                backgroundColor: "#4B9CD3",
            },
            headerTintColor: "white",
        }

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.navigation.getParam("id"),
            name: "",
            rac: "",
            criteria: [],
            notes: "",
        };
    }

    componentDidMount() {
        // Recieves an object representing an individual activation card with the form:
        //  { trauma: [String], aid: Number, name: String, age: String, rac: String, notes: String }
        const baseURL = "https://statt-portal.herokuapp.com/activations";
        fetch(baseURL + "/" + this.state.id)
            .then(res => res.json())
            .then(json => {
                const { aid, name, age, rac, trauma, notes } = json;
                this.setState({ 
                    id: aid, 
                    name: name, 
                    rac: rac, 
                    criteria: trauma, 
                    notes: notes
                });
            })
            .catch(err => console.error(err));
    }

    render() {
        const codename = this.state.name.toLowerCase();
        const isRed = codename.includes("red") || codename.includes("alpha");
        return (
            <ScrollView style={styles.wrapper}>
                <Text style={[styles.h1, isRed && styles.red]}>{this.state.name}</Text>
                <Text style={[styles.h2, isRed && styles.red]}>{this.state.rac}</Text>
                {
                    this.state.criteria.map((criterion, key) => 
                        <Text style={[styles.listItem, isRed && styles.listRed]} key={key}>
                            {criterion}
                        </Text>
                    ) // Note: putting a semicolon here will break it 
                }
                {
                    this.state.notes.length > 0 && (
                        <View>
                            <View style={styles.blackLine} />
                            <Text style={[styles.h2, isRed && styles.red]}>Notes</Text>
                            <Text>{this.state.notes}</Text>                        
                        </View>
                    )
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "white",
        margin: 8,
        ...StyleSheet.absoluteFill,
    },

    blackLine: {
        borderBottomColor: "black",
        borderBottomWidth: 1,
        margin: 20
    },

    red: {
        color: "#d10000",
    },

    h1: {
        fontSize: 32,
        fontWeight: "bold",
        marginTop: 2,
        marginBottom: 1,
        color: "#edd004",
        textAlign: "center",
    },

    h2: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 4,
        fontWeight: "bold",
        color: "#edd004",
        textAlign: "center",
    },

    listItem: {
        fontSize: 14,
        fontWeight: "bold",
        color: "black",
        backgroundColor: "#ffe10a",
        padding: 12,
        borderRadius: 8,
        borderWidth: 3,
        borderColor: "#bca607",
        overflow: "hidden",
        marginTop: 2,
        marginBottom: 2,
    },

    listRed: {
        color: "white",
        backgroundColor: "#d10000",
        borderColor: "#680000"
    },
});