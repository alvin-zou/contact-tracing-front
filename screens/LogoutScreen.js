import * as React from 'react';
import { Text, TextInput, View, Button, Platform, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import theme from '../theme.js';
import firebase from 'firebase';
import { ScrollView } from 'react-native-gesture-handler';

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

<ScrollView contentContainerStyle={styles.contentContainer}>
<View style={styles.initialText}>
  <Text style={styles.titleText}>logout</Text>
  <Text style={styles.subText}> Are you sure you want to logout? </Text>
</View>

        {/* <Button title='Yes' onPress={this.logout}></Button> */}

        <View style={{flexDirection: "row", flex: 1, alignContent: "center", justifyContent: 'center', marginVertical: 20}}>
        <TouchableOpacity
        onPress={this.logout} style={{marginHorizontal: 20, backgroundColor: "#E8E8E8", marginBottom: 20, height: 50, width: 100, borderRadius: 10, justifyContent: 'center'}}>
        <Text style={{fontSize: 24,
            alignSelf: 'center', 
            color: 'black',
          fontFamily: theme.fonts.secondary}}>YES</Text>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Home')} style={{marginHorizontal: 20,backgroundColor: "#E8E8E8", marginBottom: 20, height: 50, width: 100, borderRadius: 10, justifyContent: 'center'}}>
        <Text style={{fontSize: 24,
            alignSelf: 'center', 
            color: 'black',
          fontFamily: theme.fonts.secondary}}>NO</Text>
        </TouchableOpacity>
          
        </View>



        {/* <Button title='No' onPress={this.props.navigation.navigate('Root')}></Button> */}

</ScrollView>


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
  contentContainer: {
    paddingTop: 30,
    justifyContent: 'flex-start',
  },

  initialText: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 20,
    justifyContent: 'center'

  },

  titleText: {
    fontSize: 60,
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
    letterSpacing: 1,
    alignSelf: "center",
    textAlign: 'center',
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