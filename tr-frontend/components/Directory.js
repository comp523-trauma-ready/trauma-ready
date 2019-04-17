import React from 'react';
import { ScrollView, SectionList, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

export default class Directory extends React.Component {
    static navigationOptions = {
        title: "Directory",
        headerStyle: {
            backgroundColor: "#4B9CD3",
        },
        headerTintColor: "white",
    }

    constructor(props) {
        super(props);
        this.state = {
            organizeByRAC: false, // default: alphabetical
            hospitals: [],
        };
    }

    componentDidMount() {
        const hospitalEndpoint = "https://comp523-statt-web-portal.herokuapp.com/mobile/hospitals";
        fetch(hospitalEndpoint)
            .then(res => {
                const contentType = res.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return res.json();                    
                } else {
                    throw "HTML unexpectedly recieved... Heroku must be down!";
                }
            })
            .then(json => {
                this.setState({ hospitals : json });
            })
            .catch(err => console.error(err));
    }

    render() {
        let sections = this.state.hospitals.map((hospital, index) => {
            return { key : index, title : hospital.name.charAt(0).toUpperCase(), data : [hospital] }
        });
        return (
            <View style={styles.container}>
                <SectionList
                    renderSectionHeader={({section}) => 
                        <Text style={styles.sectionHeader}>{section.title}</Text>
                    }
                    renderItem={(i) => 
                        <DirectoryItem navigation={this.props.navigation} item={i.item} />
                    }
                    sections={sections}
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}

class DirectoryItem extends React.Component {
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
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        borderWidth: 2,
    },

    diTitle: {
        fontSize: 18,
    },

    sectionHeader: {
        fontSize: 24,
        fontWeight: "bold",
        backgroundColor: "lightgray",
        padding: 10,
    },
});