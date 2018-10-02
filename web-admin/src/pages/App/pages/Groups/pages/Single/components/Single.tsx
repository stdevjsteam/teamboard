import React, { Component } from 'react';
import { Input, Button, Row, Col, Form, Icon, message } from 'antd';
import Select from 'react-select';
import { users, groups, entities, common } from 'teamboard-store';
import arrayToObject from 'helpers/ObjectConvertor';

import { History } from 'history';
import { match } from 'react-router';

import { connect } from 'react-redux';
import messages from 'helpers/messages';

const FormItem = Form.Item;

type Props = {
  users: entities.User[];
  dispatch: common.Dispatch;
  form: any;
  match: match<{ id: common.Id }>;
  history: History;
  currentGroup: entities.Groups;
};

type State = {
  members: groups.Member[];
  memberDel: groups.Member[];
  memberAdd: groups.Member[];
};

class Single extends Component<Props, State> {
  static loadData = ({ store, match }) => {
    const promises: Promise<any>[] = [store.dispatch(users.fetchUsers())];

    if (match.params.id) {
      promises.push(store.dispatch(groups.fetchGroup(match.params.id)));
    }

    return Promise.all(promises);
  };

  state = {
    members: [],
    memberAdd: [],
    memberDel: []
  };

  handleChange = selectedOption => {
    this.setState({
      members: selectedOption.map(value => ({
        id: value.value,
        role: 'member'
      }))
    });
  };
  componentDidMount() {
    this.props.currentGroup.members.length > 0 &&
      this.setState({
        members: (this.props.currentGroup.members as any).map(id => ({
          id,
          role: 'member'
        }))
      });
  }
  handleSubmit = e => {
    const { form, dispatch } = this.props;
    const { members } = this.state;

    e.preventDefault();

    form.validateFields(async (err, { name }) => {
      if (!err) {
        const group = (await dispatch(groups.createGroup({ name }))) as any;

        const response = await dispatch(
          groups.addMembers(group.response.result, { members })
        );
        if (response) {
          message.success(`"${name}" group is successfully updated`);
          this.props.history.push('/groups');
        }
      }
    });
  };
  handleUpdate = (addedMembers, deletedMembers, e) => {
    const { form, dispatch } = this.props;
    e.preventDefault();
    form.validateFields(async (err, { name }) => {
      if (!err) {
        let response;

        if (
          this.props.currentGroup.members.length > 0 &&
          this.state.members.length === 0
        ) {
          deletedMembers = [...this.props.currentGroup.members];
          response = await dispatch(
            groups.deleteMembers(this.props.match.params.id, {
              memberIds: deletedMembers
            })
          );
        }
        if (deletedMembers.length > 0) {
          response = await dispatch(
            groups.deleteMembers(this.props.match.params.id, {
              memberIds: deletedMembers
            })
          );
        }
        if (addedMembers.length > 0) {
          response = await dispatch(
            groups.addMembers(this.props.match.params.id, {
              members: addedMembers
            })
          );
        }

        if (
          addedMembers.length === 0 &&
          deletedMembers.length === 0 &&
          this.props.currentGroup.name === name
        ) {
          message.success(
            `"${this.props.currentGroup.name}" nothing to change`
          );
          this.props.history.push('/groups');
        }

        if (this.props.currentGroup.name !== name) {
          response = (await dispatch(
            groups.editGroup(this.props.match.params.id, { name })
          )) as any;
        }
        if (response) {
          message.success(
            `"${this.props.currentGroup.name}" group is successfully updated`
          );
          this.props.history.push('/groups');
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    type Obj = { value: number; label: string; id: number };

    const selUsers: Obj[] = [];

    this.props.users.map(data => {
      const obj: Obj = {
        id: data.id,
        value: data.id,
        label: `${data.firstName} ${data.lastName}, ${data.position}`
      };

      return selUsers.push(obj);
    });
    const mydata: Obj[] = [];
    if (this.props.match.params.id) {
      selUsers.filter(elem => {
        return this.props.currentGroup.members.map(data => {
          if (elem.value === (data as any)) {
            mydata.push(elem);
          }
          return elem;
        });
      });
    }

    const updateObject: any = arrayToObject(this.state.members);
    const initialObject: any = arrayToObject(mydata);
    type arr = groups.Member[];
    const memberAdd: arr = [];
    const memberDel: arr = [];
    for (let a in initialObject) {
      if (
        this.state.members.length > 0 &&
        updateObject.hasOwnProperty(a) === false
      ) {
        memberDel.push(initialObject[a].id);
      }
    }

    for (let b in updateObject) {
      if (
        this.state.members.length > 0 &&
        initialObject.hasOwnProperty(b) === false
      ) {
        memberAdd.push(updateObject[b]);
      }
    }

    return (
      <Row gutter={16} justify="center" align="top">
        <Col span={5} />
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 10, offset: 2 }}>
          <Form
            onSubmit={
              !this.props.match.params.id
                ? this.handleSubmit
                : e => {
                    this.handleUpdate(memberAdd, memberDel, e);
                  }
            }
          >
            <FormItem>
              {getFieldDecorator('name', {
                initialValue:
                  this.props.match.params.id && this.props.currentGroup.name,
                rules: [{ required: true, message: messages.required }]
              })(
                <Input
                  prefix={
                    <Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder={
                    this.props.match.params.id ? undefined : 'Group Name'
                  }
                />
              )}
            </FormItem>

            <Select
              prefix={<Icon type="team" style={{ color: 'rgba(0,0,0,.25)' }} />}
              defaultValue={mydata}
              placeholder="Add user"
              clearable="true"
              isMulti
              isSearchable
              onChange={this.handleChange}
              options={selUsers}
            />

            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                {this.props.match.params.id ? 'Continue' : 'Create'}
              </Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    );
  }
}
const SingleGroup = Form.create()(Single);
export default connect((state: common.StoreState) => {
  return {
    currentGroup: state.entities.groups[state.groups.current!],
    users: state.users.list.map(id => state.entities.users[id])
  };
})(SingleGroup as any);
