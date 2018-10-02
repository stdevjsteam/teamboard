import React, { Component } from 'react';
import { Layout, Menu, Icon, Avatar } from 'antd';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import './index.css';
import { renderRoutes } from 'react-router-config';
import { removeTokens } from 'helpers/auth';
import { auth, common, entities } from 'teamboard-store';
import { ADMIN_ROOT } from 'config';
import MenuLink from './components/MenuLink';
import InviteEmployees from './pages/InviteEmployees';

const { Header, Content, Sider } = Layout;

type Props = RouteComponentProps<{}> & {
  currentUser: entities.User;
  dispatch: common.Dispatch;
  route: any;
};

class App extends Component<Props> {
  state = {
    inviteEmployes: false
  };
  componentDidMount() {
    this.props.dispatch(auth.fetchCurrentUser());
  }

  onLogout = () => {
    removeTokens();
    this.props.history.push('/');
  };
  handleInvitEmployee = () => {
    this.setState({ inviteEmployes: !this.state.inviteEmployes });
  };
  render() {
    const { history, currentUser } = this.props;
    const { firstName, lastName, image } = currentUser;

    return (
      <Layout style={{ height: '100%' }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          style={{ paddingTop: '20px' }}
        >
          <Menu theme="dark" mode="inline" selectable={false}>
            <Menu.Item
              style={{
                cursor: 'default',
                textAlign: 'center',
                marginBottom: '20px'
              }}
            >
              <img
                src={require('assets/images/logo_with_title.png')}
                alt="logo"
                style={{ width: 'auto', height: '100%' }}
              />
            </Menu.Item>
            <MenuLink to="/" exact icon="global" title="News" />
            <MenuLink
              to="/interesting-to-knows"
              exact
              icon="question-circle"
              title="Interesting to know"
            />
            <MenuLink to="/events" exact icon="calendar" title="Events" />
            <MenuLink to="/groups" exact icon="usergroup-add" title="Groups" />
            <MenuLink to="/users" exact icon="user-add" title="Users" />
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, height: 'auto' }}>
            <Menu
              selectable={false}
              mode="horizontal"
              style={{ display: 'flex', justifyContent: 'flex-end' }}
              onClick={({ key }) => {
                switch (key) {
                  case 'profile':
                    history.push('/profile');
                    break;
                  case 'logout':
                    this.onLogout();
                    break;
                }
              }}
            >
              <Menu.Item
                key="invite-employees"
                onClick={this.handleInvitEmployee}
              >
                <Icon type="team" />
                Invite Employees
              </Menu.Item>
              <Menu.SubMenu
                title={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      style={{
                        verticalAlign: 'middle',
                        backgroundColor: '#00B2F0',
                        marginRight: '10px'
                      }}
                      src={image && ADMIN_ROOT + '/' + image}
                    >
                      {firstName && firstName.slice(0, 1).toUpperCase()}
                    </Avatar>
                    <span style={{ marginTop: '5px' }}>
                      {firstName} {lastName}
                    </span>
                  </div>
                }
              >
                <Menu.Item key="profile">
                  <Icon type="profile" />
                  Profile
                </Menu.Item>

                <Menu.Item key="logout">
                  <Icon type="logout" />
                  Sign out
                </Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </Header>
          <Content style={{ margin: '24px 16px', height: '100%' }}>
            <div
              style={{
                padding: 24,
                background: '#fff',
                minHeight: '100%'
              }}
            >
              {renderRoutes(this.props.route.routes)}
            </div>
            {this.state.inviteEmployes && (
              <InviteEmployees handleInvitEmployee={this.handleInvitEmployee} />
            )}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state: common.StoreState) => {
  const { entities, auth } = state;
  let currentUser;

  if (!auth.currentUser) {
    currentUser = {};
  } else {
    currentUser = entities.users[auth.currentUser];
  }

  return { currentUser };
};

export default connect(mapStateToProps)(App as any);
