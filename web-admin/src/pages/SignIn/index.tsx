import './index.css';
import React, { Component, FormEvent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, Row, Form, Input, Icon } from 'antd';
import { common, auth } from 'teamboard-store';
import { FormComponentProps } from 'antd/lib/form';
import { RouteComponentProps } from 'react-router';
import DocumentTitle from 'react-document-title';

import { setTokens } from 'helpers/auth';
import messages from 'helpers/messages';
import { renderRoutes } from 'react-router-config';

type Props = FormComponentProps &
  RouteComponentProps<{}> & { dispatch: common.Dispatch; route: any };

class SignIn extends Component<Props> {
  state = { loading: false };

  handleSubmit = (e: FormEvent) => {
    const { form, dispatch, history } = this.props;

    e.preventDefault();

    form.validateFields(async (err, values) => {
      if (err) {
        return;
      }

      this.setState({ loading: true });

      const tokens: any = await dispatch(auth.signIn(values));

      this.setState({ loading: false });

      if (tokens.response) {
        setTokens(tokens.response);
        history.push('/');
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <DocumentTitle title="Welcome to Employee app!">
        <div className="login-form">
          <div className="login-form__logo">
            <img alt="logo" src={require('assets/images/logo.png')} />
          </div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item hasFeedback>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: messages.required }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Email"
                />
              )}
            </Form.Item>
            <Form.Item hasFeedback>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: messages.required }]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Row>
              <Button
                className="login-form__button"
                type="primary"
                htmlType="submit"
                loading={this.state.loading}
              >
                Sign in
              </Button>
            </Row>
          </Form>
          {renderRoutes(this.props.route.routes)}
        </div>
      </DocumentTitle>
    );
  }
}

export default compose(
  Form.create(),
  connect()
)(SignIn);
