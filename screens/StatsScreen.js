import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import theme from '../theme.js';
import PieChart from 'react-native-pie-chart';
import { Dimensions, TouchableHighlight } from 'react-native';
import { MonoText } from '../components/StyledText';

const status = "safe"; // safe, limited, restricted, quarantined
const chart_wh = 250
const series = [123, 321, 123, 789, 537]
const sliceColor = ['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800']

statusColor = (status==="safe" ? theme.colors.primary.safe : 
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

          <TouchableHighlight
      style = {{
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').width * 0.5,
        backgroundColor:'#f00',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      underlayColor = '#ccc'
      onPress = { () => alert('Yaay!') }
    >
      <Text> Mom, look, I am a circle! </Text>
    </TouchableHighlight>




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
