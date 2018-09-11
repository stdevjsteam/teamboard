import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

const configureStore = require('../store/configure');

const store = configureStore();

export function registerScreens() {
  Navigation.registerComponentWithRedux(
    'teamboard.auth.Activation',
    () => require('./auth/screens/Activation').default,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    'teamboard.auth.Profile',
    () => require('./auth/screens/Profile').default,
    Provider,
    store
  );
}
