import React, { Component } from 'react';
import { StyleSheet, KeyboardAvoidingView, View, Platform } from 'react-native';
import { Button, ControlBox, Presentational, TextInput } from 'components';
import { invitations } from 'teamboard-store';
import { connect } from 'react-redux';

class Activation extends Component<any, any> {
  state = { value: '', loading: false };

  handleSubmit = async () => {
    try {
      this.setState({ loading: true });
      await this.props.dispatch(
        invitations.checkCode({ code: this.state.value })
      );
      this.setState({ loading: false });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { value, loading } = this.state;

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{ flex: 1 }}
      >
        <View style={styles.wrapper}>
          <Presentational
            image={require('./img/building.png')}
            title="Welcome"
          />
          <ControlBox>
            <ControlBox.Inputs>
              <ControlBox.InputWrapper>
                <TextInput
                  value={value}
                  onChangeText={(value: string) => {
                    this.setState({ value });
                  }}
                  placeholder="######"
                  maxLength={6}
                  keyboardType="number-pad"
                />
              </ControlBox.InputWrapper>
            </ControlBox.Inputs>
            <Button disabled={loading} onPress={this.handleSubmit}>
              GO
            </Button>
          </ControlBox>
        </View>
      </KeyboardAvoidingView>
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

export default connect()(Activation);
