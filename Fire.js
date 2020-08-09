import firebase from 'firebase';
import { Alert } from 'react-native';

export function init() {
  var config = {
    apiKey: "AIzaSyDJCY20RQG-OGtRUgNil9XNrRJr4y28RsQ",
    authDomain: "hcapp-e434a.firebaseapp.com",
    databaseURL: "https://hcapp-e434a.firebaseio.com",
    projectId: "hcapp-e434a",
    storageBucket: "hcapp-e434a.appspot.com",
    messagingSenderId: "761140869554",
    appId: "1:761140869554:web:ea56455bcf11dd1b55ccab",
    measurementId: "G-B7HWD41TV6"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
}

export function signUpUser(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
                 .then(() => {
                    Alert.alert('Account creation successful',
                                'User account created & signed in!');
                  })
                  .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                      Alert.alert('Already in use',
                                  'That email address is already in use!');
                    }

                    if (error.code === 'auth/invalid-email') {
                      Alert.alert('Invalid email',
                                  'That email address is invalid!');
                    }

                    console.error(error);
                  });
}

export function writeUserData(uid, firstName, lastName, house) {
  firebase.database().ref('users/' + uid).set({
    firstName: firstName,
    lastName: lastName,
    house: house
  })
}
