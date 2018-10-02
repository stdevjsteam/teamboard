import React, { Component } from 'react';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import AddRole from './pages/addRole';

class ManageRoles extends Component<any, any> {
  state = { visible: false };
  handleModal = () => {
    this.setState({ visible: !this.state.visible });
  };
  render() {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'ID',
        key: 'id',
        render: text => <a href="javascript:;">{text}</a>
      },
      {
        title: 'Role',
        dataIndex: 'role',
        key: 'role'
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
    const roles = [
      { id: 1, role: 'developer' },
      { id: 2, role: 'pm' },
      { id: 3, role: 'qa' }
    ];
    const data: {
      key: number;
      //   name: string;
      //   email: string;
      role: string;
    }[] = roles.map((elem, i) => {
      return {
        ID: i + 1,
        id: elem.id,
        key: elem.id,
        // name: elem.firstName + elem.lastName,
        // email: elem.email,
        role: elem.role
      };
    });
    console.log(this.state.visible);
    return (
      <DocumentTitle title="Manage Roles">
        <div>
          {' '}
          <Button type="primary" onClick={this.handleModal}>
            Add Roles
          </Button>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 7 }}
          />
          {this.state.visible && <AddRole handleModal={this.handleModal} />}
        </div>
      </DocumentTitle>
    );
  }
}

export default ManageRoles as any;
