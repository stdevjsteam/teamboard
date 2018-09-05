import React, { ComponentType } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "helpers/auth";
import hoistNonReactStatics from "hoist-non-react-statics";

import Events from "pages/App/pages/Events";
import SignIn from "pages/SignIn";
import App from "pages/App";
import Profile from "pages/App/pages/Profile";
import News from "pages/App/pages/News";
import SingleNews from "pages/App/pages/News/pages/Single";
import InterestingToKnow from "pages/App/pages/InterestingToKnow";
import SingleInterestingToKnow from "pages/App/pages/InterestingToKnow/pages/Single";
import InviteEmployees from "pages/App/pages/InviteEmployees";
// import Group from "antd/lib/input/Group";
import Groups from "pages/App/pages/Groups";

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
    path: "/",
    ...Conditional(App, SignIn as ComponentType<any>),
    routes: [
      {
        path: "/",
        exact: true,
        ...Protected(News)
      },
      {
        path: "/news/add",
        ...Protected(SingleNews)
      },
      {
        path: "/news/:id/edit",
        ...Protected(SingleNews)
      },
      {
        path: "/interesting_to_know",
        exact: true,
        ...Protected(InterestingToKnow)
      },
      {
        path: "/interesting_to_know/add",
        ...Protected(SingleInterestingToKnow)
      },
      {
        path: "/interesting_to_know/:id/edit",
        ...Protected(SingleInterestingToKnow)
      },
      {
        path: "/events",
        ...Protected(Events)
      },
      {
        path: "/profile",
        ...Protected(Profile as ComponentType<any>)
      },
      {
        path: "/invite-employees",
        ...Protected(InviteEmployees as ComponentType<any>)
      },
      {
        path: "/groups",
        ...Protected(Groups as ComponentType<any>)
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
