import { Navigation } from 'react-native-navigation';

export function registerScreens() {
  Navigation.registerComponent(
    'teamboard.auth.Activation',
    () => require('./auth/screens/Activation').default
  );

  Navigation.registerComponent(
    'teamboard.auth.Profile',
    () => require('./auth/screens/Profile').default
  );
}
