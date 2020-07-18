import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Animated, Easing } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import theme from '../theme.js';
import { MonoText } from '../components/StyledText';

export default class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeFirstText: new Animated.Value(1),
      fadeSecondText: new Animated.Value(0),
    }
  }

  fadeIn = (anim, fn) => Animated.timing(anim, {
    toValue: 1, duration: 1000,
  }).start(fn);

  fadeOut = (anim, fn) => Animated.timing(anim, {
    toValue: 0, duration: 1000,
  }).start(fn);

  componentDidMount() {
    this.animate();
  }

  animate() {
    Animated.timing(this.state.fadeFirstText, {
      toValue: 1, duration: 3000, /* <--- modify for initial text time */
    }).start(({ finished }) => {
      this.fadeOut(this.state.fadeFirstText, ({ finished }) => {
        this.fadeIn(this.state.fadeSecondText, ({ finished }) => {
          Animated.timing(this.state.fadeSecondText, {
            toValue: 1, duration: 3000,
          }).start(({ finished }) => {
            this.props.navigation.replace('Root', true)
          });
        });
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <View style={styles.getStartedContainer}>

            <Text style={styles.welcomeText}>
              welcome
            </Text>
            <View style={{ alignItems: 'center' }}>
              <Animated.Text style={[styles.subText, { opacity: this.state.fadeFirstText, }]}>
                JUST A QUICK SURVEY TO GET STARTED
              </Animated.Text>
              <Animated.Text style={[styles.subText, { opacity: this.state.fadeSecondText }]}>
                YOU CAN UPDATE YOUR RESPONSES AT ANY TIME
              </Animated.Text>
            </View>

          </View>

        </ScrollView>

      </View>
    );
  }
}

WelcomeScreen.navigationOptions = {
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
    backgroundColor: theme.colors.primary.background,
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
    marginHorizontal: 50,
  },
  welcomeText: {
    fontSize: 50,
    fontWeight: 'bold',
    paddingTop: '80%',
    color: theme.colors.primary.safe,
    fontFamily: theme.fonts.titles,
    textAlign: 'center',
    letterSpacing: 3,
  },
  subText: {
    fontSize: 26,
    color: theme.colors.fonts.dark,
    fontFamily: theme.fonts.secondary,
    textAlign: 'center',
    letterSpacing: 3,
    position: 'absolute',
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
