import React, { Component } from 'react';
import styled from 'styled-components/native';
import { TextInputProps } from 'react-native';

const Input = styled.TextInput<TextInputProps & { focused: boolean }>`
  border-bottom-width: ${props => (props.focused ? 2 : 1)};
  border-bottom-color: ${props =>
    props.focused ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.3)'};
  height: 40;
  text-align: center;
  font-size: 14;
`;

class TextInput extends Component<TextInputProps> {
  state = { focused: false };

  render() {
    return (
      <Input
        {...this.props}
        placeholderTextColor="rgba(0, 0, 0, 0.4)"
        focused={this.state.focused}
        onFocus={() => {
          this.setState({ focused: true });
        }}
        onBlur={() => {
          this.setState({ focused: false });
        }}
        maxLength={6}
      />
    );
  }
}

export default TextInput;
