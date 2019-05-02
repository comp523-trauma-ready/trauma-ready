import React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import DirectoryItem from './DirectoryItem';

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
      hospitals: [],
    };
  }

  componentDidMount() {
    const baseURL = "https://statt-portal.herokuapp.com/mobile/hospitals";
    fetch(baseURL)
      .then(res => {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return res.json();
        } else {
          throw "HTML unexpectedly recieved... Heroku must be down!";
        }
      })
      .then(json => this.setState({ hospitals: json }))
      .catch(err => console.error(err));
  }

  render() {
    let sections = [
      { title: "A", data: [] }, { title: "B", data: [] }, { title: "C", data: [] },
      { title: "D", data: [] }, { title: "E", data: [] }, { title: "F", data: [] },
      { title: "G", data: [] }, { title: "H", data: [] }, { title: "I", data: [] },
      { title: "J", data: [] }, { title: "K", data: [] }, { title: "L", data: [] },
      { title: "M", data: [] }, { title: "N", data: [] }, { title: "O", data: [] },
      { title: "P", data: [] }, { title: "Q", data: [] }, { title: "R", data: [] },
      { title: "S", data: [] }, { title: "T", data: [] }, { title: "U", data: [] },
      { title: "V", data: [] }, { title: "W", data: [] }, { title: "X", data: [] },
      { title: "Y", data: [] }, { title: "Z", data: [] },
    ];

    // Iterate through each hospital, finding the section it belongs under
    this.state.hospitals.forEach((hospital) => {
      let key = hospital.name.charAt(0).toUpperCase();
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].title == key) {
          sections[i].data.push(hospital);
          break;
        }
      }
    });

    // Finally, remove all section headers with no hospitals 
    const reducedSections = sections.filter(section => section.data.length > 0);

    return (
      <View style={styles.container}>
        <SectionList
          renderSectionHeader={({ section }) =>
            <Text style={styles.sectionHeader}>{section.title}</Text>
          }
          renderItem={(i) =>
            <DirectoryItem navigation={this.props.navigation} item={i.item} />
          }
          sections={reducedSections}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "white"
  },

  diContainer: {
    flex: .5,
    margin: 0,
    padding: 0,
    borderWidth: 1,
    borderRadius: 10,
  },

  diTitle: {
    fontSize: 18,
  },

  sectionHeader: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#619acf",
    padding: 2,
    paddingLeft: 4,
    color: "white",
  },
});