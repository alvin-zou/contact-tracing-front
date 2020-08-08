// import * as WebBrowser from 'expo-web-browser';
// import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import theme from '../theme.js';
// import { MonoText } from '../components/StyledText';


export default function MenuScreen({navigation}) {


  const house = {name: "CURRIER HOUSE", file: require('../assets/images/Currier.png')};
  const aboutImageFirstRow = [{name: "METHODOLOGY", file: require("../assets/images/Methodology.png")}, {name: "PRIVACY", file: require("../assets/images/Privacy.png")}, {name: "SURVEY", file: require("../assets/images/Survey.png")}]
  const student = {acronym: "DS", name: "DEMO STUDENT"};
  const negative = true;
  const aboutImageSecondRow = [{name: "SETTINGS", file: require("../assets/images/Settings.png")}, {name: "COVID-19 INFO", file: require("../assets/images/covid_info.png")}, {name: "CONTACT US", file: require("../assets/images/Contact_us.png")}]

  const displayFirstRow = aboutImageFirstRow.map( (img, index) => 
      <TouchableOpacity key={index} style={styles.imageContainer}  onPress={()=> Alert.alert("Not available yet.")}>
        <Image style={styles.aboutImage} source={img.file}></Image>
        <Text style={styles.houseText}>{img.name}</Text>
      </TouchableOpacity>
  );

  const displaySecondRow = aboutImageSecondRow.map( (img, index) => 
  <TouchableOpacity key={index} style={styles.imageContainer}  onPress={()=> Alert.alert("Not available yet.")}>
  <Image style={styles.aboutImage} source={img.file}></Image>
  <Text style={styles.houseText}>{img.name}</Text>
</TouchableOpacity>
  );

  const showFirstRow = (
    <View style={{alignContent: "center", flexDirection:"row", paddingTop: '10%', flex: 1, justifyContent: "center"}}>
      <View style={styles.imageContainer}>
        <View style={{height: 75, width: 75, backgroundColor: theme.colors.primary.oldSafe, borderRadius: 75 / 2}}>
          <Text style={{fontSize: 37, top: 10, textAlign: "center", color: "white",fontFamily: theme.fonts.secondary,letterSpacing: 1,}}>
            {student.acronym}
          </Text>
        </View>
        <Text style={styles.houseText}>{student.name}</Text>
      </View>
      <View style={styles.imageContainer2}>
          <Image style={styles.image2} source={house.file} /> 
          <Text style={styles.houseText2}>{house.name}</Text>
      </View>
      <View style={styles.imageContainer}>
        {
          negative ? 
          <View style={{height: 75, width: 75, backgroundColor: theme.colors.primary.oldSafe, borderRadius: 75 / 2}}>
          <Text style={{fontSize: 70,textAlign: "center", color: "white",fontFamily: theme.fonts.secondary,letterSpacing: 1, bottom: 15}}>
          -</Text>
        </View>
          :
          <View style={{height: 75, width: 75, backgroundColor: theme.colors.primary.restricted, borderRadius: 75 / 2}}>
          <Text style={{fontSize: 50, top: 2, textAlign: "center", color: "white",fontFamily: theme.fonts.secondary,letterSpacing: 1, bottom: 15}}>
          !</Text>
        </View>
        }
       {
         negative ?
         <Text style={styles.houseText}>NO SIGNS OF COVID-19</Text>
        :         <Text style={styles.houseText}>SELF ISOLATE</Text>
       }
      </View>
    </View>
  );
 
  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.initialText}>
          <Text style={styles.titleText}>
                menu
              </Text>
              <Text style={styles.subText}>
              PROFILE
              </Text>

        </View>

        <View>
          {showFirstRow}
          <Text style={styles.infoText} onPress={() => Alert.alert("Not available yet.")}>EDIT PROFILE</Text>
        </View>
        <Text style={styles.subText}>
              ABOUT
           </Text>
          
        <View style={{flexDirection: "row", justifyContent: "center"}}>
          {displayFirstRow}
        </View>

        <View style={{flexDirection: "row", justifyContent: "center"}}>
          {displaySecondRow}
        </View>

        <View style={styles.LogoContainer}>
          <Image style={styles.logoImage} source={require("../assets/images/Logo.png")}></Image>
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
    color: theme.colors.primary.oldSafe,
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
    alignSelf: "center",
  },
  imageContainer: {
    color: theme.colors.primary.background,
    alignItems: "center",
  },
  image: {
    borderColor: "orange",
    width: 75,
    height: 75,
    borderWidth: 5,
    borderRadius: 75 / 2,
  },
  imageContainer2: {
    marginHorizontal: 30,
    height: 75,
    width: 75,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderColor: "orange",
    borderWidth: 5,
    borderRadius: 75 / 2,
  },
  image2: {
    resizeMode: "contain",
    height: 40,
    width: 40,
    left: 1,
    top: 22,
  },
  houseText: {
    fontSize: 15,
    // paddingTop: '15%',
    textAlign: "center",
    width: 125,
    color: "black",
    fontFamily: theme.fonts.secondary,
    letterSpacing: 1,
  },
  houseText2: {
    fontSize: 15,
    textAlign: "center",
    width: 125,
    color: "black",
    fontFamily: theme.fonts.secondary,
    letterSpacing: 1,
    top: 37,
  },
  logoText: {
    fontSize: 15,
    textAlign: "center",
    width: 125,
    color: "gray",
    fontFamily: theme.fonts.secondary,
    letterSpacing: 1,
  },
  LogoContainer: {
    color: theme.colors.primary.background,
    alignItems: "center",
    marginTop: 30,
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  aboutImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  infoText: {
    fontSize: 20,
    color: "black",
    fontFamily: theme.fonts.secondary,
    letterSpacing: 1,
    textDecorationLine: "underline",
    marginTop: 10,
    marginBottom: 30,
    alignSelf: "center",
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
