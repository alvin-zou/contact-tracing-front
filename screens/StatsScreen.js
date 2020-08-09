// import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  // Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPie,
  VictoryStack,
  VictoryLegend,
} from 'victory-native';
import theme from '../theme';
// import { Dimensions, TouchableHighlight } from "react-native";
// import { MonoText } from '../components/StyledText';

const status = 'safe';

let statusColor = '';

switch (status) {
  case 'safe':
    statusColor = theme.colors.primary.safe;
    break;
  case 'limited':
    statusColor = theme.colors.primary.limited;
    break;
  case 'restricted':
    statusColor = theme.colors.primary.restricted;
    break;
  case 'quarantined':
    statusColor = 'black';
    break;
  // no default
}

// rec = recommended number of contacts; act = actual number of contacts; first entry = 4 days ago, second entry = 3 days ago, etc.
const contacts = [
  { rec: 33, act: 10 },
  { rec: 30, act: 25 },
  { rec: 25, act: 15 },
  { rec: 20, act: 10 },
  { rec: 15, act: 10 },
  { rec: 10, act: 13 },
  { rec: 10, act: 2 },
];

const max = contacts.reduce(
  (prev, curr) => Math.max(prev, curr.rec, curr.act),
  0
);

// let max = 0;
// for (let i = 0; i < 5; i++) {
//   if (contacts[i].rec > max) {
//     max = contacts[i].rec;
//   }
//   if (contacts[i].act > max) {
//     max = contacts[i].act;
//   }
// }

// const maxScore = Math.ceil(max / 10) * 10;

// const scoreLabels = Array.from([4, 3, 2, 1, 0], (x) => x * (maxScore / 4));

// const getHeight = (score) => {
//   return 27.5 * (score / (maxScore / 4));
// };

const startDay = 3; // 0 = MON, 1 = TUE, ETC.
const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const weekDaysDisplay = [];
for (let i = 0; i < 7; i++) {
  weekDaysDisplay.push(weekDays[(startDay + i) % 7]);
}

// TODO how is this data calculated?
const actBarData = weekDaysDisplay.map((weekday, index) => ({
  x: weekday,
  y: contacts[index].act,
}));

const recBarData = weekDaysDisplay.map((weekday, index) => ({
  x: weekday,
  y: contacts[index].rec,
}));

const pieChartData = [
  { x: 'Infected', y: 35 },
  { x: 'Exposed', y: 40 },
  { x: 'Safe', y: 55 },
];

const getCumulScore = () => {
  return 27;
};

const getColor = (act, rec) => {
  if (act > rec) {
    return theme.colors.primary.restricted;
  }
  if (act > 0.75 * rec) {
    return theme.colors.primary.limited;
  }
  return theme.colors.primary.safe;
};

const infoAlert = () => {
  Alert.alert(
    'Cumulative Score',
    'Your cumulative score is meant to give you prev sense of how consistently you met the social distancing limits and guidelines.',
    [{ text: 'CLOSE', style: 'cancel' }]
  );
};

// function getCoordinatesForPercent(percent) {
//   const x = Math.cos(2 * Math.PI * percent);
//   const y = Math.sin(2 * Math.PI * percent);
//   return [x, y];
// }
// const percent = 0.12;
// const startX = getCoordinatesForPercent(0)[0];
// const startY = getCoordinatesForPercent(0)[1];
// const endX = getCoordinatesForPercent(percent)[0];
// const endY = getCoordinatesForPercent(percent)[1];
// const largeArcFlag = percent > 0.5 ? 1 : 0;
// const pathData = [
//   `M ${startX} ${startY}`,
//   `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
//   `L 0 0`,
// ].join(" ");

export default function StatsScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.getStartedContainer}>
          <Text style={styles.titleText}>stats</Text>
          <Text style={styles.subText}>TODAY'S CONTACTS</Text>
          <VictoryPie
            colorScale={['tomato', 'orange', 'gold']}
            data={pieChartData}
          />
        </View>

        <View style={styles.initialText}>
          <Text style={styles.titleText}>personal</Text>
        </View>
        <Text style={styles.subText}>WEEKLY STATISTICS</Text>

        <View style={styles.container}>
          <VictoryChart width={350} theme={VictoryTheme.material}>
            <VictoryLegend
              x={125}
              y={50}
              centerTitle
              orientation="horizontal"
              gutter={20}
              style={{ border: { stroke: 'black' }, title: { fontSize: 20 } }}
              data={[
                { name: 'Actual', symbol: { fill: 'tomato' } },
                { name: 'Recommended', symbol: { fill: 'orange' } },
              ]}
            />
            <VictoryStack colorScale={['tomato', 'orange']}>
              <VictoryBar data={actBarData} />
              <VictoryBar data={recBarData} />
            </VictoryStack>
          </VictoryChart>
        </View>

        {/* <View
          style={{
            alignItems: "center",
            flex: 1,
            height: 300,
            flexDirection: "column",
          }}
        >
          <View
            style={{
              width: 2,
              height: 125,
              backgroundColor: "black",
              top: 10,
              left: "85%",
              position: "absolute",
            }}
          ></View>
          <View
            style={{
              width: "70%",
              height: 2,
              backgroundColor: "gainsboro",
              marginTop: 25,
            }}
          ></View>
          <View
            style={{
              width: "70%",
              height: 2,
              backgroundColor: "gainsboro",
              marginTop: 25,
            }}
          ></View>
          <View
            style={{
              width: "70%",
              height: 2,
              backgroundColor: "gainsboro",
              marginTop: 25,
            }}
          ></View>
          <View
            style={{
              width: "70%",
              height: 2,
              backgroundColor: "gainsboro",
              marginTop: 25,
            }}
          ></View>

          {displayDates}
          <View
            style={{
              width: "70%",
              height: 2,
              backgroundColor: "black",
              marginTop: 25,
            }}
          ></View>
        </View> 
        {displayScale} */}

        <Text style={styles.subText}>CUMULATIVE SCORE</Text>
        <View style={styles.initialText}>
          <Text style={styles.titleText}>{getCumulScore()}</Text>
        </View>
        <TouchableOpacity onPress={infoAlert}>
          <Text
            style={[
              styles.subText,
              {
                fontSize: 20,
                letterSpacing: 1,
                textDecorationLine: 'underline',
              },
            ]}
          >
            WHAT'S THIS?
          </Text>
        </TouchableOpacity>
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
//     'https://docs.expo.io/versions/latest/get-started/create-prev-new-app/#making-your-first-change'
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
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  initialText: {
    flex: 1,
    alignItems: 'center',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  getStartedContainer: {
    alignItems: 'center',

    // marginHorizontal: status === "quarantined" ? 23 : 15,
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
    color: theme.colors.primary.oldSafe,
    fontFamily: theme.fonts.titles,
    textAlign: 'center',
    paddingTop: '3%',
    letterSpacing: 3,
  },
  subText: {
    fontSize: 26,
    paddingTop: '0%',
    color: theme.colors.fonts.dark,
    fontFamily: theme.fonts.secondary,
    textAlign: 'center',
    letterSpacing: 3,
    marginHorizontal: status === 'restricted' ? 10 : 8,
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
