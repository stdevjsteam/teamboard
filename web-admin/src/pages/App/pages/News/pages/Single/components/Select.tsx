import React, { Component } from 'react';
import { Row, Col, Form, Icon, message } from 'antd';
import Select from 'react-select';
import { groups, entities, common } from 'teamboard-store';
import arrayToObject from 'helpers/ObjectConvertor';

import { match } from 'react-router';
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'react-redux';

type Props = {
  groups: entities.Groups[];
  defaultGroups: any;
  myGroups: any;
  dispatch: common.Dispatch;
  match: match<{ id: common.Id }>;
  currentGroup: entities.Groups;
} & FormComponentProps;
type State = {
  newsGroups: groups.Member[];
  addGroups: groups.Member[];
  deleteGroups: groups.Member[];
};

class Single extends Component<Props, State> {
  state = {
    newsGroups: [],
    addGroups: [],
    deleteGroups: []
  };
  static loadData = ({ store }) => {
    return store.dispatch(groups.fetchGroups());
  };

  handleChange = async selectedOption => {
    await this.setState({
      newsGroups: selectedOption.map(value => ({
        id: value.value
      }))
    });
    type Obj = { id: number };
    if (this.props.defaultGroups) {
      const selectedGroups = (this.state.newsGroups as any).map(data => {
        const obj: Obj = {
          id: data.id
        };
        return obj;
      });
      const defaultGroups = this.props.defaultGroups.map(data => {
        const obj: Obj = {
          id: data.id
        };
        return obj;
      });
      const updateObject: any = arrayToObject(selectedGroups);
      const initialObject: any = arrayToObject(defaultGroups);
      type arr = groups.Member[];
      let addGroups: arr = [];
      let deleteGroups: arr = [];
      for (let a in initialObject) {
        if (
          this.state.newsGroups.length > 0 &&
          updateObject.hasOwnProperty(a) === false
        ) {
          deleteGroups.push(initialObject[a].id);
        }
      }
      for (let b in updateObject) {
        if (
          this.state.newsGroups.length > 0 &&
          initialObject.hasOwnProperty(b) === false
        ) {
          addGroups.push(updateObject[b].id);
        }
      }
      if (defaultGroups.length > 0 && selectedGroups.length < 1) {
        const data = defaultGroups.map(data => data.id);
        deleteGroups = [...data];
      }
      this.setState({ addGroups, deleteGroups });
    }
  };

  onMethod = async () => {
    return await this.state;
  };
  handleSubmit = e => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFields(async (err, { name }) => {
      if (!err) {
      }
    });
  };

  handleUpdate = e => {
    const { form } = this.props;
    e.prevent.default();
    form.validateFields(async (err, { name }) => {
      if (!err) {
        let response;

        if (response) {
          message.success(`"" group is successfully updated`);
        }
      }
    });
  };

  render() {
    type Obj = { value: number; label: string; id: number };
    const selUsers: Obj[] = [];
    this.props.myGroups.map(data => {
      const obj: Obj = {
        id: data.id,
        value: data.id,
        label: `${data.name} `
      };
      return selUsers.push(obj);
    });
    const mydata: Obj[] = [];
    for (let b in this.props.defaultGroups) {
      const obj: Obj = {
        id: this.props.defaultGroups[b].id,
        value: this.props.defaultGroups[b].id,
        label: `${this.props.defaultGroups[b].name} `
      };
      mydata.push(obj);
    }

    return (
      <Row gutter={16} justify="center" align="top">
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 12, offset: 0 }}>
          <Form onSubmit={this.handleSubmit}>
            <Select
              prefix={<Icon type="team" style={{ color: 'rgba(0,0,0,.25)' }} />}
              defaultValue={mydata}
              placeholder="Add user"
              clearable="true"
              isMulti
              isSearchable
              onChange={selectedOption => this.handleChange(selectedOption)}
              options={selUsers}
              style={{
                container: {
                  zIndex: 2
                }
              }}
            />
          </Form>
        </Col>
      </Row>
    );
  }
}
const SingleGroup = Form.create()(Single);
export default connect(
  (state: common.StoreState) => {
    return {};
  },
  null,
  null,
  { withRef: true }
)(SingleGroup as any);
