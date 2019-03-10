import React from 'react';
import { Text, TextInput, View } from 'react-native';

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFocus = this.handleFocus.bind(this);

    this.state = {
      searchQuery: "",
    }
  }

  handleInput(newInput) {

  }

  handleSubmit(synSubmitEvent) {
    let e = synSubmitEvent; 
    let text = e.nativeEvent.text;
    console.log(text);
    text = "";
  }

  handleFocus(e) {

  }
  
  render() {
    return (
      <View style={this.props.style} >
        <View style={{flex: 1, justifyContent: "center"}}>
        <TextInput 
          style={{height: 40, borderColor: "lightgray", borderWidth: 2, margin: "4%", padding: "2%",}}
          placeholder="Search by trauma center or symptoms" 
          onChangeText={this.handleInput}
          onSubmitEditing={this.handleSubmit}
          onFocus={this.handleFocus}
        />
        </View>
      </View>
    );
  }
}