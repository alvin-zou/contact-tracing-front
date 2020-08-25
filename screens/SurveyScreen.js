import * as React from 'react';
import { TextInput, View, Button, StyleSheet } from 'react-native';
import theme from '../theme.js';
import * as fire from "../Fire.js";
import { uid } from '../App.js';

export default class SurveyScreen extends React.Component {
  state = {
    firstName: '', lastName: '', house: '',
    email: '', password: '', confirmpw: '',
    surveyPartTwo: false,
  }

  SurveyPartOneFrag = () => {
    return (
      <View>
        <TextInput
          placeholder="First name"
          onChangeText={(text) => this.setState({ firstName: text })}
        />
        <TextInput
          placeholder="Last name"
          onChangeText={(text) => this.setState({ lastName: text })}
        />
        <TextInput
          placeholder="House"
          onChangeText={(text) => this.setState({ house: text })}
        />
      </View>
    )
  }

  SurveyPartTwoFrag = () => {
    return (
      <View>
        <TextInput
          placeholder="Email"
          onChangeText={(text) => this.setState({ email: text })}
        />
        <TextInput
          placeholder="Password"
          textContentType="password"
          onChangeText={(text) => this.setState({ password: text })}
        />
        <TextInput
          placeholder="Confirm Password"
          textContentType="password"
          onChangeText={(text) => this.setState({ confirm: text })}
        />
      </View>
    )
  }

  confirmFirstPart = () =>
    Alert.alert(
      "Are the details entered correct?",
      "Press OK to confirm entered details",
      [
        {
          text: "Cancel",
          onPress: () => { },
          style: "cancel"
        },
        { text: "OK", onPress: () => this.setState({ surveyPartTwo: true }) }
      ],
      { cancelable: false }
    );

  render() {
    return (
      <View style={styles.container}>
        {this.state.surveyPartTwo ? this.SurveyPartTwoFrag() : this.SurveyPartOneFrag()}
        <Button
          title='Submit'
          onPress={() => {
            if (!this.state.surveyPartTwo) {
              this.confirmFirstPart();
              return;
            }
            fire.writeUserData(
              uid,
              this.state.firstName,
              this.state.lastName,
              this.state.house);
            this.props.navigation.navigate('Root');
          }}>
        </Button>
      </View>
    );
  }
}

SurveyScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary.background,
    alignItems: 'center',
  },
});