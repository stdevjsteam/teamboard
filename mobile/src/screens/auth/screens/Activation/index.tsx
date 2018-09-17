import React, { Component } from 'react';
import { StyleSheet, KeyboardAvoidingView, View, Platform } from 'react-native';
import { Button, ControlBox, Presentational, TextInput } from 'components';
import { invitations, common } from 'teamboard-store';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

type Props = {
  dispatch: common.Dispatch;
  componentId: string;
};

class Activation extends Component<Props> {
  state = { value: '', loading: false };

  handleSubmit = async () => {
    const { dispatch } = this.props;

    this.setState({ loading: true });

    await dispatch(invitations.checkCode({ code: this.state.value }));

    this.setState({ loading: false });

    Navigation.setRoot({
      root: {
        component: {
          name: 'teamboard.auth.Profile'
        }
      }
    });
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
