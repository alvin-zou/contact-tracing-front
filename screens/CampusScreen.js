// import * as WebBrowser from 'expo-web-browser';
// import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import theme from '../theme.js';
// import { MonoText } from '../components/StyledText';


export default function CampusScreen() {


  const houses = [
    {name: "CURRIER", imageFile: require('../assets/images/LimitContact.png'), score: 400},
    {name: "ELIOT", imageFile: require('../assets/images/Safe.png'), score: 500},
    {name: "ADAMS", imageFile: require('../assets/images/StayHome.png'), score: 300},
    {name: "ADAMS", imageFile: require('../assets/images/StayHome.png'), score: 200},
    {name: "ADAMS", imageFile: require('../assets/images/StayHome.png'), score: 0},
  ];

  houses.sort((house1, house2) => house2.score - house1.score);

  const maxScore = Math.ceil((houses[0].score) / 100) * 100;
      
  const scoreLabels = Array.from([0, 1, 2, 3, 4, 5], x => x*(maxScore / 5));

  const getPercent = (score) => {
      return 50 + 50.5 * (score / (maxScore / 5) );
  };

  const lineStyle = (index) => {
    return {
      alignItems: 'center', position: 'absolute', left: 50 * (index + 2), top: '5%'
    }
  }

  const showScoreLabel = scoreLabels.map( (score, index) => 
  <View key={index} style={lineStyle(index)}>
    <View style={{width: 2, height: 130 * houses.length + 260, backgroundColor: 'gainsboro',}}></View>
  </View>
  );
  const showScoreLabel2 = scoreLabels.map( (score, index) => 
    <Text key={index} style={{fontSize: 15, color: "black", fontFamily: theme.fonts.secondary, left: 45 + 27.5 * (index + 2), top: 10}}>{score}</Text>
  );


  const houseStyle = (score, index) => {
    return {
      backgroundColor: index==0 ? "cadetblue" : "gainsboro", height: 50, width: getPercent(score), position: "absolute", top: 50, left: 50,
    }
  }

  const displayHouses = houses.map( (house, index) => 
    <View key={index}>
      <View style={{flexDirection: "row"}}>
      <View style={houseStyle(house.score, index)}></View>
      {/* <Text style={{position: "absolute", width: getPercent(house.score), top: 65, left: getPercent(house.score), fontSize: 16,color: "black",fontFamily: theme.fonts.secondary}}>{house.score}</Text> */}
      </View>
      <View key={index} style={styles.imageContainer}>
        <Image style={styles.image} source={house.imageFile} /> 
        <Text style={styles.houseText}>{house.name}</Text>
      </View>
        
    </View>

  );

  return (
    <View style={styles.container}>



      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.initialText}>
          <Text style={styles.titleText}>
                campus
              </Text>
              <Text style={styles.subText}>
              TOTAL SCORE
              </Text>

        </View>

        <View style={{flex: 1}}>
          {showScoreLabel}
          {displayHouses}
          <View style={{width: 50, height: 75}}>

          </View>

        </View>

      </ScrollView>

      <View style={{backgroundColor: "white", height: 50, width: "100%", flexDirection: "row"}}>
        {showScoreLabel2}
      </View>

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
    backgroundColor: "white",    

  },
  contentContainer: {
    paddingTop: 30,
    justifyContent: "flex-start",
  },

  initialText: {
    flex: 1,
    alignItems: "center",
  },
  
  titleText: {
    fontSize: 60,
    fontWeight: 'bold',
    // paddingTop: '55%',
    color: theme.colors.primary.safe,
    fontFamily: theme.fonts.titles,
    letterSpacing: 3,
  },
  subText: {
    fontSize: 26,
    // paddingTop: '15%',
    color: "black",
    fontFamily: theme.fonts.secondary,
    letterSpacing: 3,
    marginHorizontal:  8,
  },
  imageContainer: {
    paddingTop: '10%',
    flex: 1,
    color: theme.colors.primary.background,
    height: 135,
    width: 115,
    alignItems: "center",
  },
  image: {
    width: 75,
    height: 75,
    borderColor: "orange",
    borderWidth: 5,
    borderRadius: 75 / 2,
  },
  houseText: {
    fontSize: 15,
    // paddingTop: '15%',
    color: "black",
    fontFamily: theme.fonts.secondary,
    letterSpacing: 1,
  },
  infoText: {
    fontSize: 20,
    color: theme.colors.primary.background,
    fontFamily: theme.fonts.secondary,
    letterSpacing: 3,
    textDecorationLine: "underline",
    left: 10,
    top: 1,
  },
  info: {
    bottom: 20,
    left: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
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