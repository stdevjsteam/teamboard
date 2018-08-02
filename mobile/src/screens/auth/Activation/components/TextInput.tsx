import React, { Component } from 'react';
import { TextInputProps } from 'react-native';
import TextInput from 'components/TextInput';

class Input extends Component<TextInputProps> {
  state = { focused: false, selection: { start: 0, end: 0 }, v: 'test' };

  // componentDidUpdate(prevProps: any) {
  //   const { length } = this.props.value;

  //   if (length !== prevProps.value.length) {
  //     let cursor = length + Math.floor(length / 2);
  //     this.setState({ selection: { start: cursor, end: cursor } });
  //   }
  // }

  encodeValue = (value: string) => {
    if (!this.state.focused) {
      return value;
    }

    let encoded = '';
    const TOTAL_LENGTH = 9;

    for (let i = 0; i < 6; i++) {
      if (i > 0 && i % 2 === 0) {
        encoded += ' ';
      }

      const v = value.charAt(i);

      if (!!v) {
        encoded += v;
        continue;
      }

      encoded += '#';
    }

    return encoded;
  };

  decodeValue = (value: string) => {
    return value
      .split('')
      .filter(v => v !== ' ' && v !== '#')
      .join('');
  };

  handleSelectionChange = () =>
    this.setState({ selection: { start: 0, end: 0 } });

  render() {
    return (
      <TextInput
        {...this.props}
        keyboardType="number-pad"
        value={this.encodeValue(this.props.value)}
        placeholder="Enter the activation code"
        onFocus={() => this.setState({ focused: true })}
        onBlur={() => this.setState({ focused: false })}
        onChangeText={(value: string) => {
          this.props.onChangeText(this.decodeValue(value));
        }}
        // selection={this.state.selection}
        // onSelectionChange={this.handleSelectionChange}
      />
    );
  }
}

export default Input;
