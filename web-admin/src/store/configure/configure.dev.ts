import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware, push } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { message } from 'antd';

export const history = createBrowserHistory();

import rootReducer from 'teamboard-store/dist/rootReducer';
import apiMiddleware from 'teamboard-store/dist/middleware/api';
import { getTokens, setTokens, removeTokens } from 'helpers/auth';

const configure = preloadedState => {
  const api = apiMiddleware({
    getTokens,
    setTokens,
    removeTokens,
    redirect: store => store.dispatch(push('/')),
    onFailure: error => {
      if (error.message) {
        message.error(error.message);
      }

      if (error.validationErrors) {
        error.validationErrors.forEach(e => {
          message.error(e.message);
        });
      }
    }
  });

  const store = createStore(
    connectRouter(history)(rootReducer),
    preloadedState,
    composeWithDevTools(
      applyMiddleware(thunk, api as any, routerMiddleware(history))
    )
  );

  return store;
};

export default configure;
