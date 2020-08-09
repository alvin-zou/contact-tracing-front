import * as React from 'react';
import {  Text, View, Button, StyleSheet } from 'react-native';
import theme from '../theme.js';
import firebase from 'firebase';

export default class LogoutScreen extends React.Component {
    constructor(props) {
        super(props);
        this.logout = async () => {
            firebase.auth().signOut().then(function() {
                console.log('You\'ve been signed out!');
                props.navigation.navigate('Sign On');
              }).catch(function(error) {
                console.error(error);
              });
        }
      }

  render() {
    return (
      <View style={styles.container}>
        <Text> Are you sure you want to logout? </Text>
        <Button title='Yes' onPress={this.logout}></Button>
        <Button title='No' onPress={this.props.navigation.navigate('Root')}></Button>
    </View>
    );
  }
}

LogoutScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary.background,
    alignItems: 'center'
  },
});