import { Navigation } from 'react-native-navigation';

export function registerScreens() {
  Navigation.registerComponent(
    'teamboard.auth.Activation',
    () => require('./auth/Activation').default
  );

  Navigation.registerComponent(
    'teamboard.auth.Profile',
    () => require('./auth/Profile').default
  );
}
