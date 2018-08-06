import React, { Fragment, Component } from 'react';
import { StyleSheet, View, Text, Image, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import fillData from './img/fill_data.png';
import Button from 'components/Button';
import TextInput from 'components/TextInput';

class Profile extends Component {
  state = { value: '' };

  render() {
    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.wrapper}
      >
        <View style={styles.welcomeContainer}>
          {Platform.OS === 'ios' ? (
            <Fragment>
              <Image source={fillData} />
              <Text style={styles.welcome}>{"Let's start".toUpperCase()}</Text>
            </Fragment>
          ) : (
            <Fragment>
              <Text style={styles.welcome}>{"Let's start".toUpperCase()}</Text>
              <Image source={fillData} />
            </Fragment>
          )}
        </View>
        <View style={styles.controlsContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              value={this.state.value}
              onChangeText={(value: string) => {
                this.setState({ value });
              }}
              placeholder="First name"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={this.state.value}
              onChangeText={(value: string) => {
                this.setState({ value });
              }}
              placeholder="Last name"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              value={this.state.value}
              onChangeText={(value: string) => {
                this.setState({ value });
              }}
              placeholder="Email"
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button disabled onPress={() => {}}>
              GO
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 25
  },
  welcomeContainer: {
    alignItems: 'center',
    height: Platform.OS === 'ios' ? '40%' : '35%',
    justifyContent: 'space-between'
  },
  welcome: {
    fontFamily: 'RussoOne-Regular',
    fontSize: 24,
    color: '#000'
  },
  controlsContainer: {
    backgroundColor: Platform.OS === 'ios' ? '#fafafa' : '#fff',
    width: '95%',
    borderRadius: 8,
    height: '60%',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  inputContainer: {
    width: Platform.OS === 'ios' ? '100%' : '80%',
    justifyContent: 'center',
    marginBottom: 20
  },
  buttonContainer: {
    width: '100%',
    marginTop: '10%'
  }
});

export default Profile;
