import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

type Props = {
  to: string;
  exact?: boolean;
  icon: string;
  title: string;
};

const MenuLink = ({ to, exact, icon, title }: Props) => (
  <Route
    path={to}
    exact={exact}
    children={({ match }) => (
      <Menu.Item
        // these errors are workaround of many errors. keep as they are
        onItemHover={() => {}}
        onClick={() => {}}
        className={
          match ? 'ant-menu-item ant-menu-item-selected' : 'ant-menu-item'
        }
      >
        <Link to={to}>
          <Icon type={icon} />
          <span>{title}</span>
        </Link>
      </Menu.Item>
    )}
  />
);

export default MenuLink;
