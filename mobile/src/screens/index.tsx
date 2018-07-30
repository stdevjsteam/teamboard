import { Navigation } from 'react-native-navigation';
import Splash from './Splash';

export function registerScreens() {
  Navigation.registerComponent('teamboard.Splash', () => Splash);
}
