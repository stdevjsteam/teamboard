import { Navigation } from 'react-native-navigation';
import Splash from './Splash';
import Activation from './Activation';

export function registerScreens() {
  Navigation.registerComponent('teamboard.Splash', () => Splash);
  Navigation.registerComponent('teamboard.Activation', () => Activation);
}
