import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import * as fire from './Fire';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';

import WelcomeScreen from './screens/WelcomeScreen';
import OneMessageScreen from './screens/OneMessageScreen';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

// eslint-disable-next-line no-unused-vars
export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }
  return (
    fire.init(),
    (
      <View style={styles.container}>
        {/* {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />} */}
        <NavigationContainer linking={LinkingConfiguration}>
          <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Root" component={BottomTabNavigator} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="OneMessage" component={OneMessageScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    )
  );
}
