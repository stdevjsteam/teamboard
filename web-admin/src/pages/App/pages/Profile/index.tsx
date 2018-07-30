import React, { Component, FormEvent } from 'react';
import { Form, Input, Button, message, Row, Col } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormComponentProps } from 'antd/lib/form';

import { auth, users, common, entities } from 'teamboard-store';
import ImageUpload from './components/ImageUpload';

type Props = {
  dispatch: common.Dispatch;
  user: entities.User;
} & FormComponentProps;

class Profile extends Component<Props & any> {
  static loadData({ store }) {
    return store.dispatch(auth.fetchCurrentUser());
  }

  handleSubmit = (e: FormEvent) => {
    const { form, dispatch } = this.props;

    e.preventDefault();

    form.validateFields(async (err, values) => {
      if (err) {
        return;
      }

      const result: any = await dispatch(users.updateUser(values));

      if (result.response) {
        message.success('Account details is successfully updated.');
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { user } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      }
    };

    return (
      <DocumentTitle title="Manage your account">
        <Row type="flex" justify="center">
          <Col sm={24} md={12} xl={8}>
            <Form onSubmit={this.handleSubmit} hideRequiredMark>
              <Form.Item {...formItemLayout} label="Photo">
                <ImageUpload user={user} />
              </Form.Item>
              <Form.Item {...formItemLayout} label="Email">
                {getFieldDecorator('email', { initialValue: user.email })(
                  <Input />
                )}
              </Form.Item>

              <Form.Item {...formItemLayout} label="First Name">
                {getFieldDecorator('firstName', {
                  initialValue: user.firstName
                })(<Input />)}
              </Form.Item>

              <Form.Item {...formItemLayout} label="Last Name">
                {getFieldDecorator('lastName', { initialValue: user.lastName })(
                  <Input />
                )}
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  xs: {
                    span: 24
                  },
                  sm: {
                    span: 18,
                    offset: 6
                  }
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: '100%' }}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </DocumentTitle>
    );
  }
}

const mapStateToProps = (state: common.StoreState) => {
  const { entities, auth } = state;
  const user = entities.users[auth.currentUser!];

  return { user };
};

export default compose(
  Form.create(),
  connect(mapStateToProps)
)(Profile);
