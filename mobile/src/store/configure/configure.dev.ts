import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Alert } from 'react-native';

import rootReducer from 'teamboard-store/dist/rootReducer';
import apiMiddleware from 'teamboard-store/dist/middleware/api';

export const USER_ROOT = 'http://localhost:8000';

const configure = preloadedState => {
  const api = apiMiddleware({
    callbacks: {
      getTokens: () => {
        return {
          accessToken: '',
          refreshToken: ''
        };
      },
      setTokens: () => {},
      removeTokens: () => {},
      redirect: () => {},
      onFailure: error => {
        if (error.message) {
          Alert.alert('Error', error.message);
        }

        if (error.validationErrors) {
          error.validationErrors.forEach(e => {
            Alert.alert('Error', e.message);
          });
        }
      }
    },
    apiRoot: USER_ROOT
  });

  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, api as any)
  );

  return store;
};

export default configure;
