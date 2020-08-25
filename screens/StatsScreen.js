// import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  // Image,
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  Dimensions,
  Switch,
} from 'react-native';
import { Layout } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';

import StatsDonutChart from '../components/StatsDonutChart';
import StatsBarChart from '../components/StatsBarChart';
import theme from '../theme';

const healthStatus = 'safe';

const { height, width } = Dimensions.get('window');

let statusColor = '';

switch (healthStatus) {
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

// rec = recommended number of contacts; act = actual number of contacts; first entry = 6 days ago, second entry = 5 days ago, etc.
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
    "Each day, we calculate a recommended number of daily contacts per person in order to minimize the probability of an outbreak. If you stay below today's recommended Number, your cumulative score increases by one.",
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

const StatsScreen = () => {
  const [showDonut, setShowDonut] = React.useState(false);

  const onActiveCheckedChange = () =>
    setShowDonut(previousState => !previousState);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.getStartedContainer}>
          <Text style={styles.titleText}>stats</Text>
        </View>
        <View>
          <Layout style={styles.layoutContainer}>
            <Layout style={styles.layoutLabel} level="1">
              <Text>Bar</Text>
            </Layout>
            <Layout style={styles.layoutSwitch} level="2">
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={showDonut ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={onActiveCheckedChange}
                value={showDonut}
              />
            </Layout>
            <Layout style={styles.layoutLabel} level="3">
              <Text>Donut</Text>
            </Layout>
          </Layout>
          {showDonut ? (
            <StatsDonutChart
              width={width}
              height={width}
              innerRadius={70}
              padAngle={3}
              colorScale={['#A4D38D', '#A784E2', '#3E77BA', '#EFA148']}
              labelStyle={[
                {
                  fontSize: 65,
                  fill: theme.colors.primary.oldSafe,
                  letterSpacing: 10,
                  fontWeight: 'bold',
                  fontFamily: theme.fonts.titles,
                },
                {
                  fontWeight: '600',
                  fontSize: 23,
                  fill: theme.colors.fonts.dark,
                  fontFamily: theme.fonts.secondary,
                },
                {
                  fontWeight: '600',
                  fontSize: 23,
                  fill: theme.colors.fonts.dark,
                  fontFamily: theme.fonts.secondary,
                },
              ]}
              data={pieChartData}
              centerLabelText={['200', 'POINTS FOR', 'CURRIER']}
            />
          ) : (
            <StatsBarChart actBarData={actBarData} recBarData={recBarData} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default StatsScreen;

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
  layoutContainer: {
    paddingTop: '5%',
    flex: 1,
    flexDirection: 'row',
  },
  layoutLabel: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  layoutSwitch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    borderBottomColor: theme.colors.fonts.dark,
    borderBottomWidth: StyleSheet.hairlineWidth,

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
    paddingTop: '6%',
    letterSpacing: 3,
    borderBottomColor: theme.colors.fonts.dark,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  subText: {
    fontSize: 26,
    paddingTop: '0%',
    color: theme.colors.fonts.dark,
    fontFamily: theme.fonts.secondary,
    textAlign: 'center',
    letterSpacing: 3,
    marginHorizontal: healthStatus === 'restricted' ? 10 : 8,
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
