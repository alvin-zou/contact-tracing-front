import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import theme from '../theme.js';
import { MonoText } from '../components/StyledText';

const status = "quarantined"; // safe, limited, restricted, quarantined

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <View style={styles.getStartedContainer}>

          <View style={styles.imageContainer}>
            <Image style={styles.image} source={require(
              status==="safe" ? '../assets/images/Safe.png' :
              (status==="limited" ? '../assets/images/LimitContact.png' :
              (status==="restricted" ? '../assets/images/StayHome.png' :
              (status==="quarantined" ? '../assets/images/Quarantine.png' : null))))} />
          </View>

          <Text style={styles.titleText}>
            {status==="safe" ? `safe` :
              (status==="limited" ? `limit contact` :
              (status==="restricted" ? `stay home` :
              (status==="quarantined" ? `self-isolate` : null)))}
          </Text>
          <Text style={styles.subText}>
            {status==="safe" ? `YOUR INTERACTION COUNT IS WELL BELOW THE DAILY LIMIT.` :
              (status==="limited" ? `YOUR INTERACTION COUNT IS APPROACHING THE DAILY LIMIT.` :
              (status==="restricted" ? `YOUR INTERACTION COUNT HAS REACHED THE DAILY LIMIT.` :
              (status==="quarantined" ? `YOU'VE BEEN QUARANTINED DUE TO COVID-19 EXPOSURE.` : null)))}
          </Text>
          <Text style={styles.subText}>
            {status==="safe" ? `THANKS FOR KEEPING HARVARD HEALTHY.` :
              (status==="limited" ? `PRACTICE SOCIAL DISTANCING WHEREVER POSSIBLE.` :
              (status==="restricted" ? `STAY HOME.\n STOP THE SPREAD.` :
              (status==="quarantined" ? `AVOID NON-ESSENTIAL INTERACTIONS.` : null)))}
          </Text>

        </View>

      </ScrollView>

    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: status==="safe" ? theme.colors.primary.safe :
      (status==="limited" ? theme.colors.primary.limited :
      (status==="restricted" ? theme.colors.primary.restricted :
      (status==="quarantined" ? theme.colors.primary.quarantined : null))),
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
    marginHorizontal: status==="quarantined" ? 23 : 15,
  },
  imageContainer: {
    alignItems: 'center',
    paddingTop: '0%',
    width: '10%',
    height: '10%',
    color: theme.colors.primary.background,
  },
  image: {
    flex: 1,
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  titleText: {
    fontSize: 60,
    fontWeight: 'bold',
    paddingTop: status==="quarantined" ? '58%' : '55%',
    color: theme.colors.primary.background,
    fontFamily: theme.fonts.titles,
    textAlign: 'center',
    letterSpacing: 3,
  },
  subText: {
    fontSize: 26,
    paddingTop: (status==="safe")||(status==="restricted") ? '15%' : '5%',
    color: theme.colors.primary.background,
    fontFamily: theme.fonts.secondary,
    textAlign: 'center',
    letterSpacing: 3,
    marginHorizontal: status==="restricted" ? 10 : 8,
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
