import { Navigation } from 'react-native-navigation';

import { registerScreens } from './src/screens';

registerScreens();

// start the app
Navigation.startSingleScreenApp({
  screen: {
    screen: 'teamboard.Splash',
    navigatorStyle: {
      navBarHidden: true
    }
  }
});
