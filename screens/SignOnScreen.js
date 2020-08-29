import * as React from 'react';
import { Text, TextInput, View, Button, Platform, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import theme from '../theme.js';
import firebase from 'firebase';
import { ScrollView } from 'react-native-gesture-handler';

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

      <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.initialText}>
        <Text style={styles.titleText}>login</Text>
      </View>

        <View style={{alignItems: "center"}}>

        <Text style={styles.subText}>EMAIL</Text>
        <View style={{backgroundColor: "#E8E8E8", height: 50, width: 300, borderRadius: 10, marginBottom: 20, }}>
        <TextInput
        onChangeText={(text) => this.setState({email: text})} style={{    fontFamily: theme.fonts.secondary,
          fontSize: 26, height: 50, width: 250, alignSelf: 'center'}}>
        </TextInput>
        </View>
        

        <Text style={styles.subText}>PASSWORD</Text>
        <View style={{backgroundColor: "#E8E8E8", height: 50, width: 300, borderRadius: 10, marginBottom: 20, }}>
        <TextInput
        onChangeText={(text) => this.setState({password: text})} secureTextEntry={true} style={{    fontFamily: theme.fonts.secondary,          fontSize: 26, height: 50, width: 250, alignSelf: 'center'}}>
        </TextInput>
        </View>

        <TouchableOpacity
        onPress={this.login} style={{backgroundColor: "#E8E8E8", marginBottom: 20, height: 50, width: 100, borderRadius: 10, justifyContent: 'center'}}>
        <Text style={{fontSize: 24,
            alignSelf: 'center', 
            color: 'black',
          fontFamily: theme.fonts.secondary}}>LOG IN</Text>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={this.signUp} style={{backgroundColor: "#E8E8E8", marginBottom: 20, height: 50, width: 300, borderRadius: 10, justifyContent: 'center'}}>
        <Text style={{fontSize: 24,
            alignSelf: 'center', 
            color: 'black',
          fontFamily: theme.fonts.secondary}}>CREATE NEW ACCOUNT</Text>
        </TouchableOpacity>


        <TouchableOpacity
        onPress={() => {this.props.navigation.navigate('Root');}} style={{backgroundColor: "#A5D38D", marginBottom: 20, height: 50, width: 300, borderRadius: 10, justifyContent: 'center'}}>
        <Text style={{fontSize: 24,
            alignSelf: 'center', 
            color: 'black',
          fontFamily: theme.fonts.secondary}}>Test mode (skip login)</Text>
        </TouchableOpacity>

        </View>

    </ScrollView>


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
  contentContainer: {
    paddingTop: 30,
    justifyContent: 'flex-start',
  },

  initialText: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },

  titleText: {
    fontSize: 60,
    marginTop: 100,
    fontWeight: 'bold',
    // paddingTop: '55%',
    color: theme.colors.primary.oldSafe,
    fontFamily: theme.fonts.titles,
    letterSpacing: 3,
  },
  subText: {
    fontSize: 26,
    // paddingTop: '15%',
    color: 'black',
    fontFamily: theme.fonts.secondary,
    letterSpacing: 3,
    alignSelf: "center",
  },
  imageContainer: {
    paddingTop: '10%',
    paddingLeft: '5%',
    flex: 1,
    color: theme.colors.primary.background,
    height: 135,
    width: 115,
  },
  image: {
    justifyContent: 'flex-start',
    width: 75,
    height: 75,
    borderColor: 'orange',
    borderWidth: 5,
    borderRadius: 75 / 2,
  },
  messageTitleText: {
    fontSize: 18,
    color: 'black',
    fontFamily: theme.fonts.secondary,
    letterSpacing: 1,
    marginLeft: 10,
  },
  messageText: {
    fontSize: 14,
    color: 'gray',
    fontFamily: theme.fonts.secondary,
    letterSpacing: 1,
    marginLeft: 40,
    marginRight: 20,
  },
  messageTitleTextOne: {
    fontSize: 18,
    color: 'black',
    fontFamily: theme.fonts.secondary,
    letterSpacing: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  messageTextOne: {
    fontSize: 15,
    color: 'gray',
    fontFamily: theme.fonts.secondary,
    letterSpacing: 1,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  infoText: {
    fontSize: 20,
    color: theme.colors.primary.background,
    fontFamily: theme.fonts.secondary,
    letterSpacing: 3,
    textDecorationLine: 'underline',
    left: 10,
    top: 1,
  },
  info: {
    bottom: 20,
    left: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
});
