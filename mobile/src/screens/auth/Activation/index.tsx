import React, { Fragment, Component } from 'react';
import { StyleSheet, View, Text, Image, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import building from './img/building.png';
import Button from 'components/Button';
import TextInput from './components/TextInput';

class Activation extends Component {
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
              <Image source={building} />
              <Text style={styles.welcome}>{'Welcome'.toUpperCase()}</Text>
            </Fragment>
          ) : (
            <Fragment>
              <Text style={styles.welcome}>{'Welcome'.toUpperCase()}</Text>
              <Image source={building} />
            </Fragment>
          )}
        </View>
        <View style={styles.controlsContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              value={this.state.value}
              onChangeText={value => {
                console.log(value.length);
                if (value.length < 6) {
                  this.setState({ value });
                } else {
                  this.setState({ value: this.state.value });
                  console.log(this.state.value);
                }
              }}
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
    height: Platform.OS === 'ios' ? '70%' : '65%',
    justifyContent: 'space-around'
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
    height: '30%',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  inputContainer: {
    width: Platform.OS === 'ios' ? '100%' : '80%',
    justifyContent: 'center'
  },
  buttonContainer: {
    width: '100%',
    marginTop: '10%'
  }
});

export default Activation;
