import React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';

export default class Directory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    const localStorage = "http://localhost:3000/demo/hospitals";
    fetch(localStorage)
      .then(res => res.json())
      .then(json => {
        console.log(json);
      })
      .catch(err => console.error(err));
  }

  // const HospitalData = [
  //   {
  //     id: 0,
  //     name: "UNC Health Care",
  //     rac: "Mid-Carolina",
  //     traumaLevel: "Adult, Pediatric",
  //     services: [],
  //     address: "101 Manning Drive, N.C. Neurosciences Hospital, Basement, Chapel Hill, NC 27514",
  //     latitude: 0,  // Computed once by API at time of entry via Maps Geocoding service
  //     longitude: 0,
  //     phoneDirectory: ["984-974-4721", "984-974-5602", "984-974-2024"],
  //     email: "tarheeltrauma@unchealth.unc.edu",
  //     notes: "GOAL: Door to Decision Time 15 Minutes..."
  //   }
  // ];

  render() {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center", padding: 10}}>
        <Text>Directory</Text>
        <SectionList
          renderItem={({item, index, section}) => <Text key={index}>{item}</Text>}
          renderSectionHeader={({section: {title}}) => (
            <Text style={{fontWeight: 'bold'}}>{title}</Text>
          )}
          sections={[
            {title: 'Title1', data: ['item1', 'item2']},
            {title: 'Title2', data: ['item3', 'item4']},
            {title: 'Title3', data: ['item5', 'item6']},
          ]}
          keyExtractor={(item, index) => item + index} 
        />
      </View>
    );
  }
}