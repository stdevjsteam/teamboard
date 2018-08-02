import React, { ReactChild } from 'react';
import { StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';

const Button = ({
  children,
  disabled = false,
  ...props
}: {
  children: ReactChild;
  disabled?: boolean;
}) => (
  <TouchableOpacity
    activeOpacity={disabled ? 1 : 0.2}
    style={[
      styles.wrapper,
      { backgroundColor: disabled ? 'rgba(0, 0, 0, 0.3)' : '#0c77f2' }
    ]}
    {...props}
  >
    <Text style={styles.text}>{children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: Platform.OS === 'ios' ? 60 : 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Platform.OS === 'ios' ? 8 : 0
  },
  text: {
    color: '#fff',
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default Button;
