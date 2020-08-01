import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import theme from '../theme.js';
import Svg, { Circle, Path } from 'react-native-svg';
import { Dimensions, TouchableHighlight } from 'react-native';
import { MonoText } from '../components/StyledText';

const status = "safe"; // safe, limited, restricted, quarantined





function getCoordinatesForPercent(percent) {
  const x = Math.cos(2 * Math.PI * percent);
  const y = Math.sin(2 * Math.PI * percent);

  return [x, y];
}

const percent = 0.12;

const startX = getCoordinatesForPercent(0)[0];
const startY = getCoordinatesForPercent(0)[1];
const endX = getCoordinatesForPercent(percent)[0];
const endY = getCoordinatesForPercent(percent)[1];

const largeArcFlag = percent > .5 ? 1 : 0;

const pathData = [
  `M ${startX} ${startY}`,
  `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
  `L 0 0`,
].join(' ');




const statusColor = (status==="safe" ? theme.colors.primary.safe :
(status==="limited" ? theme.colors.primary.limited :
(status==="restricted" ? theme.colors.primary.restricted :
(status==="quarantined" ? theme.colors.primary.quarantined : 'black'))));

export default function StatsScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <View style={styles.getStartedContainer}>

          <Text style={styles.titleText}>
            stats
          </Text>
          <Text style={styles.subText}>
            TODAY'S CONTACTS
          </Text>

          <Svg height="100%" width="100%">
            <Path d="M100 0 A100 100 0 0 1 100 200 A100 100 0 0 1 100 0" fill={theme.colors.fonts.light}/>
            <Path d="M100 0 A100 100 0 0 1 200 100 L100 100" fill={statusColor}/>
            <Path d="M100 40 A60 60 0 0 1 100 160 A60 60 0 0 1 100 40" fill={theme.colors.primary.background}/>

          </Svg>

          <Text style={styles.subText}>
            WEEKLY STATISTICS
          </Text>
          <Text style={styles.subText}>
            CUMULATIVE SCORE
          </Text>

        </View>

      </ScrollView>

    </View>
  );
}

StatsScreen.navigationOptions = {
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
    backgroundColor: 'white',
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
    paddingTop: '5%',
    color: statusColor,
    fontFamily: theme.fonts.titles,
    textAlign: 'center',
    letterSpacing: 3,
  },
  subText: {
    fontSize: 26,
    paddingTop: '0%',
    color: theme.colors.fonts.dark,
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
