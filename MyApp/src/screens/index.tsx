import React from 'react';
import { View, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';

export function registerScreens() {
  Navigation.registerComponent('teamboard.auth.Activation', () => () => (
    <View>
      <Text>Test-------------</Text>
    </View>
  ));
}
