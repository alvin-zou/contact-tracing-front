import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {  TextInput, View, Button, Platform, StyleSheet } from 'react-native';
import theme from '../theme.js';
import * as fire from "../Fire.js";

export default class FormScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      house: '',
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
        placeholder="First name"
        onChangeText={(text) => this.setState({firstName: text})}>
        </TextInput>
        <TextInput
        placeholder="Last name"
        onChangeText={(text) => this.setState({lastName: text})}>
        </TextInput>
        <TextInput
        placeholder="House"
        onChangeText={(text) => this.setState({house: text})}>
        </TextInput>
        <Button
        title='Submit'
        onPress={fire.writeUserData(
                  this.state.firstName,
                  this.state.lastName,
                  this.state.house)}>
        </Button>
    </View>
    );
  }
}

FormScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary.background,
    alignItems: 'center'
  },
});
