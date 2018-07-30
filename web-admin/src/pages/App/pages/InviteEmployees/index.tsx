import React, { Component } from 'react';
import { Row, Col, Input, Button, Form, message } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { invitations, common } from 'teamboard-store';

type Props = {
  dispatch: common.Dispatch;
};

class InviteEmployees extends Component<Props> {
  state = { email: '', isLoading: false };

  onInvite = async () => {
    const { dispatch } = this.props;
    const { email } = this.state;

    this.setState({ isLoading: true });

    const action: any = await dispatch(invitations.sendCode({ email }));

    this.setState({ isLoading: false });

    if (action.response) {
      this.setState({ email: '' });
      message.success(action.response.message);
    }
  };

  render() {
    return (
      <DocumentTitle title="Invite Employees">
        <Row gutter={16} type="flex" justify="center" align="middle">
          <Col xl={8} lg={12} md={16} xs={24}>
            <Row gutter={16} type="flex">
              <Col xs={24} md={18} style={{ marginBottom: '10px' }}>
                <Input
                  placeholder="Email"
                  onChange={e => {
                    this.setState({ email: e.target.value });
                  }}
                  value={this.state.email}
                />
              </Col>
              <Col xs={24} md={6}>
                <Button
                  type="primary"
                  style={{ width: '100%' }}
                  onClick={this.onInvite}
                  loading={this.state.isLoading}
                >
                  Invite
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </DocumentTitle>
    );
  }
}

export default compose(
  connect(),
  Form.create()
)(InviteEmployees);
