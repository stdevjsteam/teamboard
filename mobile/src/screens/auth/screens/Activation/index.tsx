import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, TextInput, ControlBox, Presentational } from 'components';

class Activation extends Component {
  state = { value: '', loading: false };

  handleSubmit = async () => {
    // this.setState({ loading: true });

    // await invitations.checkCode({ code: this.state.value });

    // this.setState({ loading: false });
  };

  render() {
    const { value, loading } = this.state;

    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.wrapper}>
        <Presentational image={require('./img/building.png')} title="Welcome" />
        <ControlBox>
          <ControlBox.Inputs>
            <ControlBox.InputWrapper>
              <TextInput
                value={value}
                onChangeText={(value: string) => {
                  this.setState({ value });
                }}
                placeholder="Enter the code"
              />
            </ControlBox.InputWrapper>
          </ControlBox.Inputs>
          <Button disabled={loading} onPress={this.handleSubmit}>
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

export default Activation;
