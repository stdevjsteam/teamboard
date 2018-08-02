import React, { Component } from 'react';
import { TextInputProps, TextInput, StyleSheet, View } from 'react-native';

class Input extends Component<TextInputProps> {
  state = { focused: false };

  render() {
    const { focused } = this.state;
    console.log(this.props.value);
    return (
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: focused ? '#000' : '#707070'
          }
        ]}
      >
        <TextInput
          {...this.props}
          style={[styles.input]}
          placeholderTextColor="#707070"
          onFocus={e => {
            const { onFocus } = this.props;
            onFocus && onFocus(e);

            this.setState({ focused: true });
          }}
          onBlur={e => {
            const { onBlur } = this.props;
            onBlur && onBlur(e);

            this.setState({ focused: false });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    fontSize: 14,
    flex: 1
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 20,
    flexDirection: 'row'
  }
});

export default Input;
