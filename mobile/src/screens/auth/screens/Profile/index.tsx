import React, { Fragment, Component } from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, TextInput, ControlBox, Presentational } from 'components';

class Profile extends Component {
  state = { value: '', loading: false };

  handleSubmit = () => {};

  render() {
    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.wrapper}
      >
        <Presentational
          image={require('./img/fill_data.png')}
          title="Let's start"
        />
        <ControlBox>
          <ControlBox.Inputs>
            <ControlBox.InputWrapper>
              <TextInput
                value={this.state.value}
                onChangeText={(value: string) => {
                  this.setState({ value });
                }}
                placeholder="First name"
              />
            </ControlBox.InputWrapper>
            <ControlBox.InputWrapper>
              <TextInput
                value={this.state.value}
                onChangeText={(value: string) => {
                  this.setState({ value });
                }}
                placeholder="Last name"
              />
            </ControlBox.InputWrapper>
            <ControlBox.InputWrapper>
              <TextInput
                value={this.state.value}
                onChangeText={(value: string) => {
                  this.setState({ value });
                }}
                placeholder="Password"
              />
            </ControlBox.InputWrapper>
          </ControlBox.Inputs>
          <Button disabled={this.state.loading} onPress={this.handleSubmit}>
            GO
          </Button>
        </ControlBox>
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
  }
});

export default Profile;
