import React, { ComponentType } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from 'helpers/auth';
import hoistNonReactStatics from 'hoist-non-react-statics';

import SignIn from 'pages/SignIn';
import App from 'pages/App';
import Profile from 'pages/App/pages/Profile';
import News from 'pages/App/pages/News';
import SingleNews from 'pages/App/pages/News/pages/Single';
import InviteEmployees from 'pages/App/pages/InviteEmployees';

const Conditional = (C1: ComponentType<any>, C2: ComponentType<any>) => {
  return {
    component: props =>
      isAuthenticated() ? <C1 {...props} /> : <C2 {...props} />
  };
};

export const Protected = (C: ComponentType<any>) => {
  return {
    component: hoistNonReactStatics(props => {
      return isAuthenticated() ? <C {...props} /> : <Redirect to="/" />;
    }, C),
    shouldLoad: () => isAuthenticated()
  };
};

const routes: any = [
  {
    path: '/',
    ...Conditional(App, SignIn as ComponentType<any>),
    routes: [
      {
        path: '/',
        exact: true,
        ...Protected(News)
      },
      {
        path: '/news/add',
        ...Protected(SingleNews)
      },
      {
        path: '/news/:id/edit',
        ...Protected(SingleNews)
      },
      {
        path: '/profile',
        ...Protected(Profile as ComponentType<any>)
      },
      {
        path: '/invite-employees',
        ...Protected(InviteEmployees as ComponentType<any>)
      },
      {
        component: () => {
          return <Redirect to="/" />;
        }
      }
    ]
  }
];

export default routes;
