import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import ActivationItem from "./ActivationItem";

// Component screen for running search queries - it has a search bar that is automatically active
// (i.e. the keyboard is pulled up) as soon as a user navigates to it. 
// Searching was a nonessential feature, so this code ultimately didn't make it into final production.

export default class Search extends React.Component {
    static navigationOptions = {
        title: "Search",
        headerStyle: {
            backgroundColor: "#4B9CD3",
        },
        headerTintColor: "white",
    };

    constructor(props) {
        super(props);
        this.state = {
            text: "",
            hasSubmitted: false,
            queryMatches: []
        }
    }

    componentDidMount() {
        this._sub1 = this.props.navigation.addListener("willFocus", this._handleNavigateTo.bind(this));
        this._sub1 = this.props.navigation.addListener("willBlur", this._handleNavigateAway.bind(this));
    }

    _handleNavigateTo() {
        this.textInput.focus();
    }

    _handleNavigateAway() {
        this.setState({ text: "" });
    }

    handleSubmit(event) {
        let searchQuery = event.nativeEvent.text;
        if (searchQuery !== "") {}
        // Hardcoded because server keeps going down :(
        // if (searchQuery.toLowerCase().includes("unc")) {
        //     data = [
        //         {"aid":0,"code":"Adult Red"},
        //         {"aid":1,"code":"Adult Yellow"},
        //         {"aid":2,"code":"Pediatric Red"},
        //         {"aid":3,"code":"Pediatric Yellow"}
        //     ];
        // } else {
        //     data = [
        //         {"aid":4,"code":"Adult Alpha"},
        //         {"aid":5,"code":"Adult Bravo"},
        //         {"aid":6,"code":"Pediatric Alpha"},
        //         {"aid":7,"code":"Pediatric Bravo"}
        //     ];
        // }
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <TextInput
                    ref={(input) => { this.textInput = input; }}
                    style={styles.input}
                    placeholder={"Search by hospital or injury"}
                    autoFocus={true}
                    onSubmitEditing={this.handleSubmit.bind(this)}
                />
                {/* Horizontal separator line */}
                <View style={styles.hline} />
                <View style={styles.results}>
                    <Text style={styles.h2}>Results</Text>
                    {
                        this.state.hasSubmitted &&
                        this.state.queryMatches.map((activation, index) => {
                            return (
                                <ActivationItem
                                    navigation={this.props.navigation}
                                    key={index}
                                    id={activation.aid}
                                    code={activation.code}
                                />
                            );
                        })
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 10,
    },

    input: {
        borderWidth: 2,
        borderRadius: 4,
        padding: 8,
        marginTop: 12,
        marginBottom: 12,
        width: "100%",
        textAlign: "center",
        fontSize: 18,
        borderColor: "#4B9CD3",
    },

    results: {
        flex: 4,
        borderColor: "#4B9CD3",
        borderWidth: 1,
        margin: 10,
        padding: 10,
        borderRadius: 5,
        width: "100%",
    },

    h2: {
        fontSize: 22,
        fontWeight: "bold",
        fontStyle: "italic",
        color: "#4B9CD3",
        marginTop: 0,
        marginBottom: 4,
    },

    hline: {
        width: "100%",
        margin: 10,
        borderColor: "#3a7aa5",
        borderWidth: 1,
    },
});