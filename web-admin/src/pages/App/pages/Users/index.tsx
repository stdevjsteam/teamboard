import React, { Component } from 'react';
import { Table, Button } from 'antd';

import { connect } from 'react-redux';
import { users, entities, common } from 'teamboard-store';
import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title';

type Props = {
  users: entities.User[];
  dispatch: common.Dispatch;
};

class UsersList extends Component<Props, any> {
  static loadData = ({ store }) => {
    return store.dispatch(users.fetchUsers());
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };
  // showConfirm = ({ name, id }: entities.Groups) => {
  //   const { dispatch } = this.props;

  //   Modal.confirm({
  //     title: `Do you want to delete "${name}" ?`,
  //     onOk() {
  //       dispatch(groups.deleteGroup(id));
  //     }
  //   });
  // };

  render() {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'ID',
        key: 'id',
        render: text => <a href="javascript:;">{text}</a>
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Role',
        dataIndex: 'role',
        key: 'role'
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email'
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link to={`/groups/add/${record.key}`}>Edit </Link>
            <span>|</span>
            <a
              href="javascript:;"
              // onClick={() => {
              //   this.showConfirm(record);
              // }}
            >
              {' '}
              Delete
            </a>
          </span>
        )
      }
    ];

    const data: {
      key: number;
      name: string;
      email: string;
      role: string;
    }[] = this.props.users.map((elem, i) => {
      return {
        ID: i + 1,
        id: elem.id,
        key: elem.id,
        name: elem.firstName + elem.lastName,
        email: elem.email,
        role: elem.position
      };
    });

    return (
      <DocumentTitle title="Users">
        <div>
          {' '}
          <Link to="/users/manage-roles">
            <Button type="primary">Manage Roles</Button>
          </Link>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 7 }}
          />
        </div>
      </DocumentTitle>
    );
  }
}

export default connect((state: common.StoreState) => {
  return {
    users: state.users.list.map(id => state.entities.users[id])
  };
})(UsersList as any);
