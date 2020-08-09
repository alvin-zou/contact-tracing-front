import firebase from 'firebase';

export function init() {
  const config = {
    apiKey: "AIzaSyDJCY20RQG-OGtRUgNil9XNrRJr4y28RsQ",
    authDomain: "hcapp-e434a.firebaseapp.com",
    databaseURL: "https://hcapp-e434a.firebaseio.com",
    projectId: "hcapp-e434a",
    storageBucket: "hcapp-e434a.appspot.com",
    messagingSenderId: "761140869554",
    appId: "1:761140869554:web:ea56455bcf11dd1b55ccab",
    measurementId: "G-B7HWD41TV6",
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
}

export function writeUserData(uid, firstName, lastName, house) {
  firebase.database().ref('users/' + uid).set({
    firstName: firstName,
    lastName: lastName,
    house: house
  })
}
