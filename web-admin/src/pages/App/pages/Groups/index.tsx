import React, { Component } from 'react';
import { Table, Button, Modal } from 'antd';

import { connect } from 'react-redux';
import { groups, entities, common } from 'teamboard-store';
import { Link } from 'react-router-dom';

type Props = {
  groups: entities.Groups[];
  dispatch: common.Dispatch;
};

class GroupList extends Component<Props, any> {
  static loadData = ({ store }) => {
    return store.dispatch(groups.fetchGroups());
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };
  showConfirm = ({ name, id }: entities.Groups) => {
    const { dispatch } = this.props;

    Modal.confirm({
      title: `Do you want to delete "${name}" ?`,
      onOk() {
        dispatch(groups.deleteGroup(id));
      }
    });
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
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Count',
        dataIndex: 'count',
        key: 'count'
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
              onClick={() => {
                this.showConfirm(record);
              }}
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
      count: number;
    }[] = this.props.groups.map((elem, i) => {
      return {
        ID: i + 1,
        id: elem.id,
        key: elem.id,
        name: elem.name,
        count: elem.members.length
      };
    });

    return (
      <div>
        {' '}
        <Link to="/groups/add">
          <Button type="primary">Add Group</Button>
        </Link>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 7 }}
        />
      </div>
    );
  }
}

export default connect((state: common.StoreState) => {
  return {
    groups: state.groups.list.map(id => state.entities.groups[id])
  };
})(GroupList as any);
