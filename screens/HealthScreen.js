import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
// import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import theme from '../theme.js';

export default function SymptomScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.contentContainer}>
        <Text style={styles.welcomeText}>
          unwell?
        </Text>
        <Text style={styles.subText}>
          LET US KNOW
        </Text>
      </View>
      <OptionButton
        icon="fever-chills"
        label="FEVER OR CHILLS"
        // highlight ??
        onPress={() => WebBrowser.openBrowserAsync('https://docs.expo.io')}
      />

      <OptionButton
        icon="cough"
        label="COUGH"
        onPress={() => WebBrowser.openBrowserAsync('https://reactnavigation.org')}
      />

      <OptionButton
        icon="short-of-breath"
        label="SHORT OF BREATH"
        onPress={() => WebBrowser.openBrowserAsync('https://forums.expo.io')}
        isLastOption
      />

      <OptionButton
        icon="fatigue"
        label="FATIGUE"
        onPress={() => WebBrowser.openBrowserAsync('https://reactnavigation.org')}
      />

      <OptionButton
        icon="other"
        label="OTHER"
        onPress={() => WebBrowser.openBrowserAsync('https://reactnavigation.org')}
      />

      {/* needs padding */}
      <OptionButton
        icon="report-symptoms"
        label="REPORT SYMPTOMS"
        onPress={() => WebBrowser.openBrowserAsync('https://reactnavigation.org')}
      />

      <View style={styles.contentContainer}>
        <Text style={styles.welcomeText}>
          contacts
        </Text>
      </View>
    </ScrollView>
  );
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingVertical: 0,
  },
  getStartedContainer: {
    paddingTop: 0,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 60,
    fontWeight: 'bold',
    paddingTop: '20%',
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
    paddingBottom: 30
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginTop: 1
  }
});
