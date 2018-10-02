import React, { ComponentType } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from 'helpers/auth';
import hoistNonReactStatics from 'hoist-non-react-statics';

import Events from 'pages/App/pages/Events';
import SignIn from 'pages/SignIn';
import App from 'pages/App';
import Profile from 'pages/App/pages/Profile';
import News from 'pages/App/pages/News';
import SingleNews from 'pages/App/pages/News/pages/Single';
import InterestingToKnow from 'pages/App/pages/InterestingToKnow';
import SingleInterestingToKnow from 'pages/App/pages/InterestingToKnow/pages/Single';
import InviteEmployees from 'pages/App/pages/InviteEmployees';
import SingleGroup from './../pages/App/pages/Groups/pages/Single/components/Single';
import Groups from 'pages/App/pages/Groups';
import Users from 'pages/App/pages/Users';
import ManageRoles from 'pages/App/pages/Users/pages/ManageRoles';

// import Modal1 from "pages/App/pages/InviteEmployees/Modal";

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
        path: '/interesting-to-knows',
        exact: true,
        ...Protected(InterestingToKnow)
      },
      {
        path: '/interesting-to-knows/add',
        ...Protected(SingleInterestingToKnow)
      },
      {
        path: '/interesting-to-knows/:id/edit',
        ...Protected(SingleInterestingToKnow)
      },
      {
        path: '/events',
        ...Protected(Events)
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
        path: '/groups',
        exact: true,
        ...Protected(Groups as ComponentType<any>)
      },

      {
        path: '/groups/add',
        exact: true,
        ...Protected(SingleGroup as ComponentType<any>)
      },
      {
        path: '/groups/add/:id',
        exact: true,
        ...Protected(SingleGroup as ComponentType<any>)
      },
      {
        path: '/users',
        exact: true,
        ...Protected(Users as ComponentType<any>)
      },
      {
        path: '/users/manage-roles',
        exact: true,
        ...Protected(ManageRoles as ComponentType<any>)
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
