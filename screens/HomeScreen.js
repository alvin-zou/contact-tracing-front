// import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
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

const status = 'safe'; // safe, limited, restricted, quarantined

export default function HomeScreen() {
  // const [showInfo, setShowInfo] = useState(false);

  // if (status === "safe") {
  //   setShowInfo(true);
  // }

  const infoAlert = () => {
    Alert.alert(
      'Safe Screen',
      "A safe screen means that you've interacted with few (if any) infectious people since your last diagonistic test. So we're not asking you to quarantine. As always, continue to follow our social distancing guidelines, and let us know if you feel unwell.",
      [{ text: 'CLOSE', style: 'cancel' }]
    );
  };

  let info;
  let reportSymptoms;

  if (status === 'safe') {
    info = (
      <TouchableOpacity style={styles.info} onPress={infoAlert}>
        <Ionicons name="ios-information-circle" size={30} color="white" />
        <Text style={styles.infoText}>MORE INFO</Text>
      </TouchableOpacity>
    );
  }
  reportSymptoms = (
    <TouchableOpacity>
      <View style={styles.report}>
        <Ionicons
          name="md-add-circle"
          size={30}
          color="red"
          style={{ right: 10 }}
        />
        <Text style={styles.reportText}>REPORT SYMPTOMS</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {info}
        <View style={styles.getStartedContainer}>
          {/* TODO use a switch statement instead of these nested ternary operators */}
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require(status === 'safe'
                ? '../assets/images/Safe.png'
                : status === 'limited'
                ? '../assets/images/LimitContact.png'
                : status === 'restricted'
                ? '../assets/images/StayHome.png'
                : status === 'quarantined'
                ? '../assets/images/Quarantine.png'
                : 'black')}
            />
          </View>

          <Text style={styles.titleText}>
            {status === 'safe'
              ? `safe`
              : status === 'limited'
              ? `caution`
              : status === 'restricted'
              ? `exposed`
              : status === 'quarantined'
              ? `infected`
              : 'black'}
          </Text>
          <Text style={styles.subText}>
            {status === 'safe'
              ? `YOU'RE SHOWING LOW LEVELS OF EXPOSURE TO COVID-19.`
              : status === 'limited'
              ? `YOU'RE SHOWING ELEVATED LEVELS OF POSSIBLE COVID-19 EXPOSURE.`
              : status === 'restricted'
              ? `YOU'VE COME INTO CONTACT WITH SOMEONE WHO HAS COVID-19.`
              : status === 'quarantined'
              ? `YOU'VE BEEN INFECTED.`
              : 'black'}
          </Text>
          <Text style={styles.subText}>
            {status === 'safe'
              ? `THANKS FOR KEEPING HARVARD HEALTHY.`
              : status === 'limited'
              ? `LIMIT CONTACT WHEN POSSIBLE UNTIL YOUR NEXT NEGATIVE TEST.`
              : status === 'restricted'
              ? `QUARANTINE IN YOUR ROOM UNTIL YOUR NEXT NEGATIVE TEST.`
              : status === 'quarantined'
              ? `PLEASE SELF-ISOLATE UNTIL YOUR NEXT NEGATIVE TEST. IF SYMPTOMS WORSEN, SEEK MEDICAL ATTENTION.`
              : 'black'}
          </Text>
        </View>

        {reportSymptoms}
        <View style={{height: 50, flex: 1}}></View>
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

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
    backgroundColor:
      status === 'safe'
        ? theme.colors.primary.safe
        : status === 'limited'
        ? theme.colors.primary.limited
        : status === 'restricted'
        ? theme.colors.primary.restricted
        : status === 'quarantined'
        ? theme.colors.primary.quarantined
        : 'black',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: status === 'quarantined' ? 23 : 15,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
    height: 250,
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 5,
    borderRadius: 250 / 2,
    marginTop: 15,
  },
  image: {},
  titleText: {
    fontSize: 60,
    fontWeight: 'bold',
    // paddingTop: status==="quarantined" ? '58%' : '55%',
    color: theme.colors.primary.background,
    fontFamily: theme.fonts.titles,
    textAlign: 'center',
    letterSpacing: 3,
  },
  subText: {
    fontSize: 26,
    paddingTop: status === 'safe' || status === 'restricted' ? '15%' : '5%',
    color: theme.colors.primary.background,
    fontFamily: theme.fonts.secondary,
    textAlign: 'center',
    letterSpacing: 3,
    marginHorizontal: status === 'restricted' ? 10 : 8,
  },
  infoText: {
    fontSize: 20,
    color: theme.colors.primary.background,
    fontFamily: theme.fonts.secondary,
    letterSpacing: 1,
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

  report: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 35,
    flex: 1,
    height: 50,
  },
  reportText: {
    fontSize: 25,
    color: 'red',
    fontFamily: theme.fonts.secondary,
    letterSpacing: 1,
  },
  infoText: {
    fontSize: 20,
    color: theme.colors.primary.background,
    fontFamily: theme.fonts.secondary,
    letterSpacing: 1,
    textDecorationLine: "underline",
    left: 10,
    top: 1,
  },
  info: {
    left: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 10,
    marginBottom: 10,
  },

  report: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 50,
    width: "87%",
    height: 50,
    borderWidth: 5,
    borderColor: "white",
    borderRadius: 50 / 2,
  },
  reportText: {
    fontSize: 20,
    color: "red",
    fontFamily: theme.fonts.secondary,
    letterSpacing: 1,
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
