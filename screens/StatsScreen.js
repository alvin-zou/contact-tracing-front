// import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import theme from '../theme.js';
// import Svg, { Circle, Path } from 'react-native-svg';
// import { Dimensions, TouchableHighlight } from 'react-native';
// import { MonoText } from '../components/StyledText';

// const status = "safe"; // safe, limited, restricted, quarantined

const status = "safe";
const statusColor = theme.colors.primary.safe;


// statusColor = (status==="safe" ? theme.colors.primary.safe : 
// (status==="limited" ? theme.colors.primary.limited : 
// (status==="restricted" ? theme.colors.primary.restricted : 
// (status==="quarantined" ? theme.colors.primary.quarantined : 'black'))));

// rec = recommended number of contacts; act = actual number of contacts; first entry = 4 days ago, second entry = 3 days ago, etc.
const contacts = [
  {rec: 35, act: 10},
  {rec: 30, act: 25},
  {rec: 25, act: 15},
  {rec: 20, act: 10},
  {rec: 15, act: 10},
  {rec: 10, act: 13},
  {rec: 10, act: 2}
];

const getCumulScore = () => {
  return 37;
}

let max = 0;
for (let i = 0; i < 5; i++) {
  if (contacts[i].rec > max) {
    max = contacts[i].rec;
  }
  if (contacts[i].act > max) {
    max = contacts[i].act;
  }
}

const maxScore = Math.ceil((max) / 10) * 10;

const scoreLabels = Array.from([4,3,2,1,0], x => x*(maxScore / 4));

const getHeight = (score) => {
    return 27.5 * (score / (maxScore / 4) );
};

const startDay = 3; // 0 = MON, 1 = TUE, ETC.
const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']; 

const weekDaysDisplay = [];
for (let i = 0; i < 7; i++) {
  weekDaysDisplay.push(weekDays[(startDay + i) % 7]);  
}


const getColor = (act, rec) => {
  if (act > rec) {
    return theme.colors.primary.restricted;
  }
  if (act > 0.75 * rec) {
    return theme.colors.primary.limited;
  }
  return theme.colors.primary.safe;
}

const infoAlert = () => {
  Alert.alert(
    "Cumulative Score",
    "Your cumulative score is meant to give you a sense of how consistently you met the social distancing limits and guidelines.",
    [
      {text: "CLOSE", style:"cancel"}
    ]
  )}

const displayDates = contacts.map( (contact, index) => 
<View key={index} style={{position: "absolute", top: 135, left: 75 + index * 40, alignItems: "center", flexDirection: "column-reverse"}}>
  {/* <View style={{width: 25, height: 130, backgroundColor: 'white', }}></View> */}
  <View style={{width: 20, height: getHeight(contact.rec), backgroundColor: 'gainsboro', position: "absolute"}}></View>
  <View style={{width: 20, height: getHeight(contact.act), backgroundColor: getColor(contact.act, contact.rec), position: "absolute"}}></View>
  <Text style={{top: 5, fontSize: 15, color: "black", fontFamily: theme.fonts.secondary,  position: "absolute"}}>{weekDaysDisplay[index]}</Text>
</View>
);

const displayScale = scoreLabels.map( (scale, index) =>
<View key={index} style={{position: "absolute", top: 175 + index * 27, left: "87%", alignItems: "center", flexDirection: "column"}}>
  {/* <View style={{width: 25, height: 130, backgroundColor: 'white', }}></View> */}
  <Text style={{top: 5, fontSize: 15, color: "black", fontFamily: theme.fonts.secondary}}>{scale}</Text>
</View>
);


export default function StatsScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>


          <View style={styles.initialText}>
            <Text style={styles.titleText}>
              personal
            </Text>
          </View>

          <Text style={styles.subText}>
            WEEKLY STATISTICS
          </Text>

          

            <View style={{alignItems: "center", flex: 1, height: 200, flexDirection: "column"}}>

              <View style={{width: 2, height: 125, backgroundColor: 'black', top: 10, left: "85%", position: "absolute"}}></View>

              <View style={{width: "70%", height: 2, backgroundColor: 'gainsboro', marginTop: 25}}></View>
              <View style={{width: "70%", height: 2, backgroundColor: 'gainsboro', marginTop: 25}}></View>
              <View style={{width: "70%", height: 2, backgroundColor: 'gainsboro', marginTop: 25}}></View>
              <View style={{width: "70%", height: 2, backgroundColor: 'gainsboro', marginTop: 25}}></View>
              
              {displayDates}
              <View style={{width: "70%", height: 2, backgroundColor: 'black', marginTop: 25}}></View>

              </View>
          {displayScale}

          <Text style={styles.subText}>
            CUMULATIVE SCORE
          </Text>

          <View style={styles.initialText}>
            <Text style={styles.titleText}>
              {getCumulScore()}
            </Text>
          </View>

          <TouchableOpacity onPress={infoAlert}>
          <Text style={[styles.subText, {fontSize: 20, letterSpacing: 1, textDecorationLine: "underline",}]}>
            WHAT'S THIS?
          </Text>
          </TouchableOpacity>

          

          {/* <Text style={styles.subText}>
            WEEKLY CONTACTS
          </Text>
          */}


      </ScrollView>

    </View>
  );
}

StatsScreen.navigationOptions = {
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
    backgroundColor: 'white',
  },
  contentContainer: {
    paddingTop: 30,
  },
  initialText: {
    flex: 1,
    alignItems: "center",
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  // getStartedContainer: {
  //   alignItems: 'center',
  //   marginHorizontal: status==="quarantined" ? 23 : 15,
  // },
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
    color: theme.colors.primary.oldSafe,
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
