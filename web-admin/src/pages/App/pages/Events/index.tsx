import React, { Component } from 'react';
import { Table, Button, Modal } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import moment from 'moment';
import { events, entities, common } from 'teamboard-store';
import { Link } from 'react-router-dom';

type Props = {
  events: entities.Events[];
  dispatch: common.Dispatch;
};

class Events extends Component<Props> {
  static loadData = ({ store }) => {
    return store.dispatch(events.fetchEvents());
  };
  showConfirm = ({ name, id }: entities.Groups) => {
    // const { dispatch } = this.props;

    Modal.confirm({
      title: `Do you want to delete "${name}" ?`
      //   onOk() {
      //     dispatch(groups.deleteGroup(id));
      //   }
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
        title: 'Date',
        dataIndex: 'date',
        key: 'date'
      },

      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link to={`/events/${record.key}/edit`}>Edit </Link>
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
    const data = this.props.events.map((elem, i) => {
      console.log('aaaaaaaaaaaaaaaaaa', elem);
      return {
        ID: i + 1,
        id: elem.id,
        key: elem.id,
        name: elem.title,
        date: moment(elem.time).format('YYYY-MM-DD HH:mm:ss')
      };
    });
    // : {
    //     key: number;
    //     title: string;
    //     description: string;
    //   }[]
    console.log('sssssssssssss', this.props.events);
    return (
      <DocumentTitle title="Events">
        <div>
          {' '}
          <Link to="/events/add">
            <Button type="primary">Add Group</Button>
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
    events: state.events.list.map(id => state.entities.events[id])
  };
})(Events as any);
