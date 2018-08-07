import React, { Component } from 'react';
import { TextInputProps, TextInput, StyleSheet } from 'react-native';

class Input extends Component<TextInputProps> {
  state = { focused: false };

  render() {
    const { focused } = this.state;

    return (
      <TextInput
        {...this.props}
        key={this.props.placeholder}
        style={[
          styles.input,
          {
            borderBottomWidth: focused ? 2 : 1,
            borderBottomColor: focused ? '#000' : '#707070'
          }
        ]}
        placeholderTextColor="rgba(0, 0, 0, 0.4)"
        onFocus={() => this.setState({ focused: true })}
        onBlur={() => this.setState({ focused: false })}
      />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    fontSize: 14
  }
});

export default Input;
