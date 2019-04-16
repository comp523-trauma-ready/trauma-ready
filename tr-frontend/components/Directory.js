import React from 'react';
import { ScrollView, SectionList, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

export default class Directory extends React.Component {
    static navigationOptions = {
        title: "Directory",
        headerStyle: {
            backgroundColor: "#4B9CD3",
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            organizeByRAC: false, // default: alphabetical
            hospitals: [
                {
                    hid: 0,
                    hname: "UNC Hospitals",
                    rac: "Mid Carolina Trauma",
                    traumaLevel: 1,
                    services: [
                        "Trauma/Emergency Department",
                        "Surgery",
                        "Neuroscience",
                        "Pediatrics",
                    ],
                    address: "101 Manning Drive, Chapel Hill, NC 27514",
                    email: "tarheeltrauma@unc.health.unc.edu",
                },
                {
                    hid: 1, 
                    hname: "Cape Fear Valley Medical Center",
                    rac: "Mid Carolina Trauma",
                    traumaLevel: 3, 
                    services: [
                        "Trauma/Emergency Department",
                        "Surgery",
                        "Neuroscience",
                        "Pediatrics",
                        "Rehab",
                        "Neonatology Services",
                        "Carelink",
                        "Radiology",
                        "Heart & Vascular Services",
                        "Hermatology",
                        "Oncology"
                    ],
                    address: "1638 Owen Drive, Fayetteville, NC 28304",
                    email: "info@capefearvalley.com",
                }
            ],
        };
    }

    // TODO: Retrieve state data from backend 
    componentDidMount() {
        // This code setup is correct, but some technical networking detail is causing an 
        // unspecified error with the request. Will have to debug later. 
        // const hospitalEndpoint = "https://127.0.0.1:3000/mobile/hospitals";
        // fetch(hospitalEndpoint)
        //     .then(res => res.json())
        //     .then(json => {
        //         console.log("json recieved");
        //         console.log(this.state);
        //         this.setState({ hospitals : json });
        //     })
        //     .catch(err => console.error(err));
    }

    render() {
        return (
            <View style={styles.container}>
                <SectionList
                    renderSectionHeader={({section}) => 
                        <Text style={styles.sectionHeader}>{section.title}</Text>
                    }
                    renderItem={(i) => {
                        let {item, index, section} = i;
                        return (<DirectoryItem data={{...this.props, ...item}} />);
                    }}
                    sections={[
                        { key: 0, title: "C", data: [this.state.hospitals[1]] },
                        { key: 1, title: "U", data: [this.state.hospitals[0]] },
                    ]}
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
        console.log("touch recieved");
        this.props.data.navigation.navigate({
            routeName: "Hospital",
            params: {
                name: this.props.data.hname,
            }
        })
    }

    render() {
        return (
            <TouchableHighlight onPress={this.handleTouch}>
                <View style={styles.diContainer}>
                    <Text style={styles.diTitle}>{this.props.data.hname}</Text>
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
    }
});