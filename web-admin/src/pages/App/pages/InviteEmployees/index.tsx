import React, { Component } from "react";
import { Row, Col, Input, Button, Form, Modal, message } from "antd";
import DocumentTitle from "react-document-title";
import { connect } from "react-redux";
import { compose } from "redux";
import { invitations, common } from "teamboard-store";

type Props = {
  dispatch: common.Dispatch;
  handleInvitEmployee: any;
};

class InviteEmployees extends Component<Props> {
  state = {
    email: "",
    isLoading: false,
    loading: false,
    visible: true
  };

  onInvite = async () => {
    const { dispatch } = this.props;
    const { email } = this.state;

    this.setState({ isLoading: true });

    const action: any = await dispatch(invitations.sendCode({ email }));

    this.setState({ isLoading: false, visible: false });

    if (action.response) {
      this.setState({ email: "" });
      message.success(action.response.message);
    }
  };
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.props.handleInvitEmployee();
    this.setState({ visible: false });
  };
  render() {
    const { visible, loading } = this.state;
    return (
      <DocumentTitle title="Invite Employees">
        <Modal
          visible={visible}
          title="Invite Employees"
          onOk={this.handleOk}
          bodyStyle={{ height: "100px" }}
          onCancel={this.handleCancel}
          footer={""}
        >
          <Row>
            <Col span={17}>
              <Input
                placeholder="Email"
                onChange={e => {
                  this.setState({ email: e.target.value });
                }}
                value={this.state.email}
              />
            </Col>
            <Col span={1} />

            <Col span={6}>
              <Button
                key="submit"
                type="primary"
                loading={loading}
                style={{ width: "100%" }}
                onClick={this.onInvite}
                // onClick={this.handleOk}
              >
                Invite
              </Button>
            </Col>
          </Row>
        </Modal>
      </DocumentTitle>
    );
  }
}

export default compose(
  connect(),
  Form.create()
)(InviteEmployees) as any;
