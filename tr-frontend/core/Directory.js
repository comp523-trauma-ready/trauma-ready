import React from 'react';
import { ActivityIndicator, SectionList, StyleSheet, Text, View } from 'react-native';

import SLTraumaCenter from '../dir/SLTraumaCenter';

export default class Directory extends React.Component {
  static navigationOptions = {
    title: 'Directory'
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      loadError: false,
      sections: [],
    }
  }

  componentDidMount() {
    // Hit backend to load Trauma Center directory
    // Placeholder for now courtesy of: https://jsonplaceholder.typicode.com
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({ 
          isLoading: false,
          sections: sectionData,
        });
      })
      .catch((err) => {
        console.error(err)
        this.setState({ loadError: true });
      }
    );
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator/>
        </View>
      );
    } else if (this.state.loadError) {
      // Resort to local storage

    } else {
      return (
        <View style={styles.container}>
          <SectionList 
            sections={sectionData}
            // Trivial default for strings 
            renderItem={({item}) => 
              <SLTraumaCenter 
                centerName={item.centerName} 
                activationCode={item.activationCode} 
                backgroundColor={item.backgroundColor}
                url={item.url}
              />
            }
            renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
            keyExtractor={(item, index) => index}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 22,
    fontWeight: 'bold',
    backgroundColor: 'lightgray',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const sectionData = [
  {
    title: 'C',
    data: [
      {
        centerName: 'Cape Fear',
        activationCode: 'Red',
        backgroundColor: 'rgba(247,247,247,1.0)',
        url: '',
      },
      {
        centerName: 'Cape Fear',
        activationCode: 'Yellow',
        backgroundColor: 'rgba(247,247,247,1.0)',
        url: '',
      },
    ]
  },
  {
    title: 'D',
    data: [
      {
        centerName: 'DukeMed',
        activationCode: 'Yellow',
        backgroundColor: 'rgba(247,247,247,1.0)',
        url: '',
      },
      {
        centerName: 'DukeMed',
        activationCode: 'Red',
        backgroundColor: 'white',
        url: '',
      },
      {
        centerName: 'DukeMed',
        activationCode: 'Bravo',
        backgroundColor: 'rgba(247,247,247,1.0)',
        url: '',
      }
    ]
  },
  {
    title: 'U',
    data: [
      {
        centerName: 'UNC Hospitals',
        activationCode: 'Red',
        backgroundColor: 'white',
        url: '',
      },
      {
        centerName: 'UNC Hospitals',
        activationCode: 'Red',
        backgroundColor: 'rgba(247,247,247,1.0)',
        url: '',
      },
    ]
  }
]

