import React, { Component } from 'react';

import { Modal, Input, Col, Row, Button } from 'antd';

class AddRole extends Component<any, any> {
  state = { visible: true, role: '' };
  handleOk = e => {
    this.props.handleModal();
    this.setState({
      visible: false
    });
    console.log(this.state.role);
  };

  handleCancel = e => {
    this.props.handleModal();
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div>
        <Modal
          title="Add Role"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleOk}>
              Add
            </Button>
          ]}
        >
          <Row>
            <Col span={20}>
              <Input
                placeholder="Role"
                onChange={e => {
                  this.setState({ role: e.target.value });
                }}
                value={this.state.role}
              />
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default AddRole;
