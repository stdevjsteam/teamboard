import React from 'react';
import ReactDOM from 'react-dom';
import { renderRoutes } from 'react-router-config';
import routes from 'config/routes';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import PendingNavDataLoader from './PendingNavDataLoader';
import { ConnectedRouter } from 'connected-react-router';

const configure = require('./store/configure');

export const store = configure.default();

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={configure.history}>
      <PendingNavDataLoader>{renderRoutes(routes)}</PendingNavDataLoader>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root') as HTMLElement);
