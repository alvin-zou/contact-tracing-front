import * as React from 'react';
import {  TextInput, View, Button, Platform, StyleSheet, Alert } from 'react-native';
import theme from '../theme.js';
import fire from '../Fire.js';

export default class SignOnScreen extends React.Component {
  state = {
    email: '', password: ''
  }
  signUp = async () => {
    const email = String(this.state.email).trim();
    const password = String(this.state.password).trim();
    fire.signUpUser(email, password);
  }
  login = async () => {
    const email = String(this.state.email).trim();
    const password = String(this.state.password).trim();
    fire.loginUser(email, password);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
        placeholder="Email"
        onChangeText={(text) => this.setState({email: text})}>
        </TextInput>
        <TextInput
        placeholder="Password"
        onChangeText={(text) => this.setState({password: text})}>
        </TextInput>
        <Button
        title='Login'
        onPress={() => { this.login; this.props.navigation.navigate('Root'); }}>
        </Button>
        <Button
        title='Create new account'
        onPress={() => { this.signUp; this.props.navigation.navigate('Survey'); }}>
        </Button>
    </View>
    );
  }
}

SignOnScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary.background,
    alignItems: 'center'
  },
});
