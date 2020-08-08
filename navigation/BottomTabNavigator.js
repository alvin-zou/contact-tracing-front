import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import StatsScreen from '../screens/StatsScreen';
// import HealthScreen from '../screens/HealthScreen';
import MessagesScreen from '../screens/MessagesScreen';
import MenuScreen from '../screens/MenuScreen';
import CampusScreen from '../screens/CampusScreen';

// import WelcomeScreen from '../screens/WelcomeScreen';


const BottomTab = createBottomTabNavigator();

// change what is displayed
const INITIAL_ROUTE_NAME = 'Messages'; // home, stats, health, messages, menu

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  let unreadMessage = false;

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      {/* <BottomTab.Screen
        name="Campus"
        component={CampusScreen}
        options={{
          title: 'Campus',
        }}
      /> */}
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-person" />, // https://infinitered.github.io/ionicons-version-3-search/
        }}
      />
      <BottomTab.Screen  
        name="Stats"
        component={StatsScreen}
        options={{
          title: 'Statistics',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-stats" />,
        }}
      />
      <BottomTab.Screen  
        name="Campus"
        component={CampusScreen}
        options={{
          title: 'Campus',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-medkit" />,
        }}
      />
      <BottomTab.Screen  
        name="Messages"
        component={MessagesScreen}
        options={{
          title: 'Messages',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-megaphone" />,
        }}
      />
      <BottomTab.Screen  
        name="Menu"
        component={MenuScreen}
        options={{
          title: 'Menu',
        tabBarIcon: (!unreadMessage) ? (({ focused }) => <TabBarIcon focused={focused} name="md-menu" />) : (({ focused }) => <TabBarIcon focused={focused} name="md-menu" />),
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'How to get started';
    case 'Links':
      return 'Links to learn more';
  }
}
