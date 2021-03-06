import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import * as fire from './Fire.js';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import firebase from 'firebase';
export { uid };

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';

import WelcomeScreen from './screens/WelcomeScreen';
import OneMessageScreen from './screens/OneMessageScreen';
import SignOnScreen from './screens/SignOnScreen';

const Stack = createStackNavigator();
var uid;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

// eslint-disable-next-line no-unused-vars
export default function App(props) {
  const isLoadingComplete = useCachedResources();

  fire.init();

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      uid = user.uid;
    }
  });

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <View style={styles.container}>
        {/* {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}*/}
        <NavigationContainer linking={LinkingConfiguration}>
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Root" component={BottomTabNavigator} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Sign On" component={SignOnScreen} />
            <Stack.Screen name="OneMessage" component={OneMessageScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </ApplicationProvider>
  );
}
