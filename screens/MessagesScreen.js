// import * as WebBrowser from 'expo-web-browser';
// import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Button,
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

export default function MessagesScreen({ route, navigation }) {
  const [messages, setMessages] = useState([
    {
      read: false,
      title: 'STATUS UPDATE: END QUARANTINE',
      message:
        "YOU'RE NO LONGER SHOWING ELEVATED LEVELS OF EXPOSURE TO COVID-19. WHILE YOU NEED NOT CONTINUE TO QUARANTINE, IT IS ADVISED THAT YOU CONTINUE TO PRACTICE SOCIAL DISTANCING.",
    },
    {
      read: false,
      title: 'UPDATE ON SOCIAL DISTANCING',
      message:
        "DEAR STUDENTS, DUE TO THE SUCCESS OF OUR CONTACT TRACING EFFORTS, WE'RE NOW ALLOWING IN-PERSON CLASSES WITH AT MOST 20 STUDENTS EACH.",
    },
    {
      read: false,
      title: 'WELCOME BACK',
      message:
        'DEAR STUDENTS, WELCOME BACK TO HARVARD! WE KNOW THAT THIS SEMESTER WILL LOOK VERY DIFFERENT FROM WHAT WE HAD DESIRED.',
    },
  ]);

  const dotStyle = (read) => {
    if (!read) {
      return {
        height: 17,
        width: 17,
        backgroundColor: theme.colors.primary.oldSafe,
        borderRadius: 17 / 2,
        marginLeft: 10,
      };
    }
    return {
      height: 17,
      width: 17,
      backgroundColor: 'white',
      borderRadius: 17 / 2,
      marginLeft: 10,
    };
  };

  const openMessage = (ind) => {
    const newMessages = messages.slice();
    newMessages[ind].read = true;
    setMessages(newMessages);
  };

  const showMessages = messages.map((message, index) => (
    <TouchableOpacity
      key={index}
      style={{ flex: 1 }}
      onPress={() => {
        openMessage(index);
        navigation.navigate('OneMessage', {
          title: message.title,
          message: message.message,
        });
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={dotStyle(message.read)} />
        <Text style={styles.messageTitleText}>{message.title}</Text>
      </View>
      <Text style={styles.messageText} numberOfLines={3}>
        {message.message}
      </Text>
      <View
        style={{
          width: '100%',
          height: 1,
          marginBottom: 10,
          marginTop: 10,
          backgroundColor: 'black',
        }}
      />
    </TouchableOpacity>
  ));

  // const showOneMessage = () => {
  //   const message = messages[0];
  //   return <View style={{flex: 1}}>
  //   <View style={{width: "100%", height: 1, marginBottom: 10, marginTop: 10, backgroundColor: 'black',}}></View>
  //   <Text style={styles.messageTitleTextOne}>{message.title}</Text>
  //   <Text style={styles.messageTextOne}>{message.message}</Text>
  //   <View style={{alignItems: "center", marginTop: 30}}>
  //     <Button title="Go back" onPress={() => {setShowAllMessages(true); changeMessage();}} style={{alignSelf: "center"}}></Button>
  //   </View>
  // </View>
  // }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.initialText}>
          <Text style={styles.titleText}>inbox</Text>

          {/* <Button title="test" onPress = {() => navigation.navigate("Campus")} /> */}
        </View>

        <View>
          <View
            style={{
              width: '100%',
              height: 1,
              marginBottom: 10,
              marginTop: 10,
              backgroundColor: 'black',
            }}
          />
          {showMessages}
        </View>
      </ScrollView>
    </View>
  );
}

// HomeScreen.navigationOptions = {
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
    alignItems: 'center',
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
    color: 'black',
    fontFamily: theme.fonts.secondary,
    letterSpacing: 3,
    marginHorizontal: 8,
  },
  imageContainer: {
    paddingTop: '10%',
    paddingLeft: '5%',
    flex: 1,
    color: theme.colors.primary.background,
    height: 135,
    width: 115,
  },
  image: {
    justifyContent: 'flex-start',
    width: 75,
    height: 75,
    borderColor: 'orange',
    borderWidth: 5,
    borderRadius: 75 / 2,
  },
  messageTitleText: {
    fontSize: 18,
    color: 'black',
    fontFamily: theme.fonts.secondary,
    letterSpacing: 1,
    marginLeft: 10,
  },
  messageText: {
    fontSize: 14,
    color: 'gray',
    fontFamily: theme.fonts.secondary,
    letterSpacing: 1,
    marginLeft: 40,
    marginRight: 20,
  },
  messageTitleTextOne: {
    fontSize: 18,
    color: 'black',
    fontFamily: theme.fonts.secondary,
    letterSpacing: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  messageTextOne: {
    fontSize: 15,
    color: 'gray',
    fontFamily: theme.fonts.secondary,
    letterSpacing: 1,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  infoText: {
    fontSize: 20,
    color: theme.colors.primary.background,
    fontFamily: theme.fonts.secondary,
    letterSpacing: 3,
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
