import * as React from 'react';
import {  TextInput, View, Button, StyleSheet } from 'react-native';
import theme from '../theme.js';
import * as fire from "../Fire.js";
import { uid } from '../App.js';

export default class SurveyScreen extends React.Component {
  state = {
    firstName: '', lastName: '', house: ''
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="First name"
          onChangeText={(text) => this.setState({ firstName: text })}
        />
        <TextInput
          placeholder="Last name"
          onChangeText={(text) => this.setState({ lastName: text })}
        />
        <TextInput
          placeholder="House"
          onChangeText={(text) => this.setState({ house: text })}
        />
        <Button
        title='Submit'
        onPress={() => { fire.writeUserData(
                  uid,
                  this.state.firstName,
                  this.state.lastName,
                  this.state.house);
                  this.props.navigation.navigate('Root'); }}>
        </Button>
    </View>
    );
  }
}

SurveyScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary.background,
    alignItems: 'center',
  },
});