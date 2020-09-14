// import * as WebBrowser from 'expo-web-browser';
// import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import firebase from 'firebase';

import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import theme from '../theme';
// import { MonoText } from '../components/StyledText';

export default function MenuScreen({ navigation }) {

  const house = 'CURRIER';
  const status = 'safe'; // safe, limited, restricted, quarantined
  const student = { firstName: 'DEMO', lastName: 'STUDENT' };
  const name = student.firstName + '\n' + student.lastName;
  const initials = student.firstName.charAt(0) + student.lastName.charAt(0);


  const houseName = house.concat('\n' + 'HOUSE');

  const logout = async () => {
    firebase.auth().signOut().then(function() {
        console.log('You\'ve been signed out!');
        navigation.navigate('Sign On');
      }).catch(function(error) {
        console.error(error);
      });
  }

  const houseDict = {
   'CURRIER': require('../assets/images/Currier.png'),
   'QUINCY': require('../assets/images/Quincy.png'),
   'WINTHROP': require('../assets/images/Winthrop.png'),
   'LOWELL': require('../assets/images/Lowell.png'),
   'ELIOT': require('../assets/images/Eliot.png'),
   'MATHER': require('../assets/images/Mather.png'),
   'KIRKLAND': require('../assets/images/Kirkland.png'),
   'DUNSTER': require('../assets/images/Dunster.png'),
   'LEVERETT': require('../assets/images/Leverett.png'),
   'ADAMS': require('../assets/images/Adams.png'),
   'PFOHO': require('../assets/images/Pfoho.png'),
   'CABOT': require('../assets/images/Cabot.png'),
   'DUDLEY': require('../assets/images/Dudley.png'),
   'CRIMSON': require('../assets/images/Crimson.png'),
   'ELM': require('../assets/images/Elm.png'),
   'IVY': require('../assets/images/Ivy.png'),
   'OAK': require('../assets/images/Oak.png'),
  };

  const aboutImageFirstRow = [
    { name: 'METHODOLOGY', file: require('../assets/images/Methodology.png') },
    { name: 'PRIVACY', file: require('../assets/images/Privacy.png') },
    { name: 'SURVEY', file: require('../assets/images/Survey.png') },
  ];


  const aboutImageSecondRow = [
    { name: 'SETTINGS', file: require('../assets/images/Settings.png') },
    { name: 'COVID-19 INFO', file: require('../assets/images/covid_info.png') },
    { name: 'CONTACT US', file: require('../assets/images/Contact_us.png') },
  ];

  const displayFirstRow = aboutImageFirstRow.map((img, index) => (
    <TouchableOpacity
      key={index}
      style={styles.imageContainer}
      onPress={() => Alert.alert('Not available yet.')}
    >
      <Image style={styles.aboutImage} source={img.file} />
      <Text style={styles.houseText}>{img.name}</Text>
    </TouchableOpacity>
  ));

  const displaySecondRow = aboutImageSecondRow.map((img, index) => (
    <TouchableOpacity
      key={index}
      style={styles.imageContainer}
      onPress={() => Alert.alert('Not available yet.')}
    >
      <Image style={styles.aboutImage} source={img.file} />
      <Text style={styles.houseText}>{img.name}</Text>
    </TouchableOpacity>
  ));

  const showFirstRow = (
    <View
      style={{
        alignContent: 'center',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
      }}
    >
      <View style={styles.imageContainer}>
        <View
          style={{
            height: 65,
            width: 65,
            backgroundColor: theme.colors.primary.oldSafe,
            borderRadius: 65 / 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 30,
              textAlign: 'center',
              color: 'white',
              fontFamily: theme.fonts.secondary,
              letterSpacing: 1,
            }}
          >
            {initials}
          </Text>
        </View>
        <Text style={styles.houseText}>{name}</Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          height: 100,
          width: 100,
        }}>
        <View style={styles.imageContainer2}>
          <Image style={styles.image2} source={houseDict[house]} />
        </View>
        <Text style={styles.houseText2}>{houseName}</Text>
      </View>
      <View style={styles.imageContainer}>
        <View
          style={{
            height: 65,
            width: 65,
            borderWidth: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor:
             status === 'safe'
                ? theme.colors.primary.safe
                : status === 'limited'
                ? theme.colors.primary.limited
                : status === 'restricted'
                ? theme.colors.primary.restricted
                : status === 'quarantined'
                ? theme.colors.primary.quarantined
                : 'black',
            borderRadius: 65 / 2,
          }}
        >
          <Image style={styles.image3} source={require(
            status === 'safe'
                ? '../assets/images/Safe.png'
                : status === 'limited'
                ? '../assets/images/LimitContact.png'
                : status === 'restricted'
                ? '../assets/images/StayHome.png'
                : status === 'quarantined'
                ? '../assets/images/Quarantine.png'
                : '../assets/images/icon.png')} />
        </View>
        <Text style={styles.houseText}>
          {status === 'safe'
              ? `SAFE` + '\n'
              : status === 'limited'
              ? `CAUTION` + '\n'
              : status === 'restricted'
              ? `EXPOSED` + '\n'
              : status === 'quarantined'
              ? `INFECTED` + '\n'
              : 'black' + '\n'
          }
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.initialText}>
          <Text style={styles.titleText}>menu</Text>
        </View>

        <View style={{ backgroundColor: 'black', height: 1, width: "90%", alignSelf: 'center', marginBottom: 20, marginTop: 15 }}></View>

          {showFirstRow}
          <TouchableOpacity
            onPress={logout}
          >
            <Text
              style={styles.infoText}
            >
              LOGOUT
            </Text> 
          </TouchableOpacity>
          

        <View style={{ backgroundColor: 'black', height: 1, width: "90%", alignSelf: 'center', marginVertical: 20 }}></View>

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          {displayFirstRow}
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          {displaySecondRow}
        </View>

        <View style={styles.LogoContainer}>
          <Image
            style={styles.logoImage}
            source={require('../assets/images/Logo.png')}
          />
          <Text style={styles.logoText}>VERSION 0.2</Text>
          <Text style={styles.logoText}>7.12.2020</Text>
        </View>
      </ScrollView>
    </View>
  );
}

// CampusScreen.navigationOptions = {
//   header: null,
// };

// function handleLearnMorePress() {
//   WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
// }

// function handleHelpPress() {
//   WebBrowser.openBrowserAsync(
//     'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    paddingTop: 30,
    justifyContent: 'flex-start',
  },
  initialText: {
    flex: 1,
    fontWeight: 'bold',
    // paddingTop: '55%',
    color: theme.colors.primary.oldSafe,
    letterSpacing: 3,
    alignItems: 'center',
  },
  subText: {
    fontSize: 26,
    // paddingTop: '15%',
    color: 'black',
    fontFamily: theme.fonts.secondary,
    letterSpacing: 3,
    marginHorizontal: 8,
    alignSelf: 'center',
  },
  imageContainer: {
    color: theme.colors.primary.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 60,
    fontWeight: 'bold',
    // paddingTop: '55%',
    color: theme.colors.primary.oldSafe,
    fontFamily: theme.fonts.titles,
    letterSpacing: 3,
    marginTop: 20,
  },
  image: {
    borderColor: 'orange',
    width: 75,
    height: 75,
    borderWidth: 5,
    borderRadius: 75 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer2: {
    height: 65,
    width: 65,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: 'orange',
    borderWidth: 5,
    borderRadius: 65 / 2,
  },
  image2: {
    resizeMode: 'contain',
    height: 40,
    width: 40,
    alignSelf: 'center',
    left: 1,
    top: 2,
  },
  image3: {
    resizeMode: 'contain',
    height: 40,
    width: 40,
    alignSelf: 'center',
    bottom: 1,
  },
  houseText: {
    fontSize: 15,
    // paddingTop: '15%',
    textAlign: 'center',
    width: 125,
    color: 'black',
    fontFamily: theme.fonts.secondary,
    letterSpacing: 1,
  },
  houseText2: {
    fontSize: 15,
    textAlign: 'center',
    color: 'black',
    fontFamily: theme.fonts.secondary,
    letterSpacing: 1,
  },
  logoText: {
    fontSize: 15,
    textAlign: 'center',
    color: 'gray',
    fontFamily: theme.fonts.secondary,
    letterSpacing: 1,
  },
  LogoContainer: {
    color: theme.colors.primary.background,
    alignItems: 'center',
    marginTop: 30,
  },
  logoImage: {
    width: 80,
    height: 80,
  },
  aboutImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  infoText: {
    fontSize: 20,
    color: 'black',
    fontFamily: theme.fonts.secondary,
    letterSpacing: 1,
    textDecorationLine: 'underline',
    marginTop: 10,
    alignSelf: 'center',
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