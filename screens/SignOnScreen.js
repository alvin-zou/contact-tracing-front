import * as React from 'react';
import {  TextInput, View, Button, Platform, StyleSheet, Alert } from 'react-native';
import theme from '../theme.js';
import firebase from 'firebase';

export default class SignOnScreen extends React.Component {
  state = {
    email: '', password: ''
  }
  signUp = async () => {
    const email = String(this.state.email).trim();
    const password = String(this.state.password).trim();
    firebase.auth().createUserWithEmailAndPassword(email, password)
                   .then(() => {
                      console.log('User account created & signed in!');
                      this.props.navigation.navigate('Survey');
                    })
                    .catch(error => {
                      if (error.code === 'auth/email-already-in-use') {
                        console.log('That email address is already in use!');
                      }

                      if (error.code === 'auth/invalid-email') {
                        console.log('That email address is invalid!');
                      }

                      console.error(error);
                    });
  }
  login = async () => {
    const email = String(this.state.email).trim();
    const password = String(this.state.password).trim();
    firebase.auth().signInWithEmailAndPassword(email, password)
                 .then(() => {
                   console.log('You\'ve been signed in!');
                   this.props.navigation.navigate('Root');
                 })
                 .catch(error => {

                   if (error.code === 'auth/invalid-password') {
                     console.log('This password is invalid!');
                   }

                   if (error.code === 'auth/invalid-email') {
                     console.log('That email address is invalid!');
                   }

                   console.error(error);
                 });
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
        onPress={this.login}>
        </Button>
        <Button
        title='Create new account'
        onPress={this.signUp}>
        </Button>
        <Button
        title='Test mode (skip login)'
        onPress={() => {this.props.navigation.navigate('Root');}}>
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
