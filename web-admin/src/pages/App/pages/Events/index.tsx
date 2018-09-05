import React, { Component } from "react";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import {
  Form,
  Icon,
  Input,
  Button,
  Row,
  Col,
  DatePicker,
  TimePicker,
  Upload,
  message
} from "antd";

import messages from "helpers/messages";
import Location from "./location";

const FormItem = Form.Item;
const Dragger = Upload.Dragger;
const uploadProps = {
  name: "file",
  multiple: true,
  action: "//jsonplaceholder.typicode.com/posts/",
  onChange(info) {
    const status = info.file.status;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
};
class NormalLoginForm extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { address: "" };
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };
  onChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };

  onOk = value => {
    console.log("onOk: ", value);
  };
  onChange1 = async address => {
    await this.setState({ address });
    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log("Success", latLng))
      .catch(error => console.error("Error", error));
  };
  handleFormSubmit = event => {
    event.preventDefault();
  };

  render() {
  
    const { getFieldDecorator } = this.props.form;
    return (
      <Row gutter={16} justify="center" align="top">
        <Col span={7} />
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator("event-name", {
                rules: [{ required: true, message: messages.required }]
              })(
                <Input
                  prefix={
                    <Icon type="form" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Event Name"
                />
              )}
            </FormItem>

            <FormItem>
              <Location />
            </FormItem>
            <FormItem>
              {getFieldDecorator("Description", {
                rules: [{ required: true, message: messages.required }]
              })(
                <Input
                  prefix={
                    <Icon
                      type="exception"
                      style={{ color: "rgba(0,0,0,.25)" }}
                    />
                  }
                  placeholder="Description"
                />
              )}
            </FormItem>
            <FormItem>
              <div>
                <DatePicker
                  showToday={true}
                  onOk={this.onOk}
                  onChange={this.onChange}
                  format="YYYY-MM-DD "
                />{" "}
                - <TimePicker onChange={this.onChange} format=" HH:mm:ss" />
              </div>
            </FormItem>
            <Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Dragger>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={() => {
                  console.log("auuuuuuuuuuuu", this.state);
                }}
              >
                Create
              </Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    );
  }
}
const Events = Form.create()(NormalLoginForm);
export default Events;
