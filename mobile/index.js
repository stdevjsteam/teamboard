import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/screens';
import './debugger';

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'teamboard.auth.Activation'
      }
    }
  });
});
