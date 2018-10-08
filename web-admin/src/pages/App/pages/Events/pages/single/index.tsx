import React, { Component } from 'react';

import {
  Form,
  Icon,
  Input,
  Button,
  Row,
  Col,
  DatePicker,
  TimePicker,
  message
} from 'antd';
import ImageUpload from './components/ImageUpload';
import messages from 'helpers/messages';
import Location from './components/location';
import { events, common } from 'teamboard-store';
import moment from 'moment';
import { connect } from 'react-redux';

const FormItem = Form.Item;
// const Dragger = Upload.Dragger;
// const uploadProps = {
//   name: 'file',
//   multiple: true,
//   action: '//jsonplaceholder.typicode.com/posts/',
//   onChange(info) {
//     const status = info.file.status;
//     if (status !== 'uploading') {
//       console.log(info.file, info.fileList);
//     }
//     if (status === 'done') {
//       message.success(`${info.file.name} file uploaded successfully.`);
//     } else if (status === 'error') {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   }
// };
class NormalLoginForm extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      title: '',
      description: '',
      date: '',
      latLng: '',
      image: ''
    };
  }
  static loadData = ({ store, match }) => {
    if (match.params.id) {
      return store.dispatch(events.fetchEvent(match.params.id));
    }
  };
  handleSubmit = async e => {
    e.preventDefault();
    await this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let response;
        await this.setState({
          title: values.name,
          description: values.description
        });

        if (this.props.match.params.id) {
          response = await this.props.dispatch(
            events.editEvent(this.props.match.params.id, {
              title: this.state.title,
              time: this.state.date,
              location: this.state.address,
              description: this.state.description
            })
          );
        } else {
          response = await this.props.dispatch(
            events.createEvents({
              title: this.state.title,
              time: this.state.date,
              location: this.state.address,
              description: this.state.description
            })
          );
        }
        if (response) {
          const action = this.props.match.params.id ? 'updated' : 'created';
          message.success(
            `"${this.props.currentEvent.title}" is successfully ${action}`
          );
          this.props.history.push('/events');
        }
      }
    });
  };
  onhandleUpload = file => {
    this.setState({
      image: file
    });
  };
  onChange = value => {
    this.setState({ date: `${value.toDate().toISOString()}` });
  };

  getAddress = location => {
    this.setState({ address: location.address, latLng: location.latLng });
  };
  componentDidMount() {
    if (this.props.match.params.id) {
      this.setState({
        title: this.props.currentEvent.title,
        date: this.props.currentEvent.time,
        address: this.props.currentEvent.location,
        description: this.props.currentEvent.description
      });
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Row gutter={16} justify="center" align="top">
          <Col span={7} />
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
            <Form onSubmit={this.handleSubmit}>
              <FormItem>
                {getFieldDecorator('name', {
                  initialValue:
                    this.props.match.params.id && this.props.currentEvent.title,
                  rules: [{ required: true, message: messages.required }]
                })(
                  <Input
                    prefix={
                      <Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder="Event Name"
                  />
                )}
              </FormItem>
              <FormItem>
                <Location
                  getAddress={this.getAddress}
                  address={
                    this.props.currentEvent && this.props.currentEvent.location
                      ? this.props.currentEvent.location
                      : ''
                  }
                  id={
                    this.props.match.params.id ? this.props.match.params.id : ''
                  }
                />
              </FormItem>
              <FormItem>
                {getFieldDecorator('description', {
                  initialValue:
                    this.props.match.params.id &&
                    this.props.currentEvent.description,
                  rules: [{ required: true, message: messages.required }]
                })(
                  <Input
                    prefix={
                      <Icon
                        type="exception"
                        style={{ color: 'rgba(0,0,0,.25)' }}
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
                    defaultValue={
                      this.props.match.params.id &&
                      moment(this.props.currentEvent.time, 'YYYY-MM-DD ')
                    }
                    onChange={this.onChange}
                    format="YYYY-MM-DD "
                  />{' '}
                  -{' '}
                  <TimePicker
                    onChange={this.onChange}
                    defaultValue={
                      this.props.match.params.id &&
                      moment(this.props.currentEvent.time, 'HH:mm:ss ')
                    }
                    format=" HH:mm:ss"
                  />
                </div>
              </FormItem>
              <ImageUpload
                handleUpload={this.onhandleUpload}
                image={this.props.match.params.id ? '' : ''}
                //todo
              />
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  {this.props.match.params.id ? 'Edit' : 'Create'}
                </Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
        {/* <Col lg={{ span: 7, offset: 9 }}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            {this.props.match.params.id ? 'Edit' : 'Create'}
          </Button>
        </Col> */}
      </div>
    );
  }
}
const Events = Form.create()(NormalLoginForm);
export default connect((state: common.StoreState) => {
  return {
    currentEvent: state.entities.events[state.events.current!]
    // events: state.events.list.map(id => state.entities.events[id])
  };
})(Events as any);

// const SingleGroup = Form.create()(Single);
// export default connect((state: common.StoreState) => {
//   return {
//     currentGroup: state.entities.groups[state.groups.current!],
//     users: state.users.list.map(id => state.entities.users[id])
//   };
// })(SingleGroup as any);
