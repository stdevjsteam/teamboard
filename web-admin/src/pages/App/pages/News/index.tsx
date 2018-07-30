import React, { Component } from 'react';
import { List, Button, Modal, Row, Col } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { news, entities, common } from 'teamboard-store';
import { Link } from 'react-router-dom';

type Props = {
  news: entities.News[];
  dispatch: common.Dispatch;
};

class News extends Component<Props> {
  static loadData = ({ store }) => {
    return store.dispatch(news.fetchNews());
  };

  showConfirm = ({ title, id }: entities.News) => {
    const { dispatch } = this.props;

    Modal.confirm({
      title: `Do you want to delete "${title}" ?`,
      onOk() {
        dispatch(news.deleteNews(id));
      }
    });
  };

  render() {
    return (
      <DocumentTitle title="News">
        <div>
          <Row type="flex" justify="end">
            <Col xs={24} md={2}>
              <Link
                to="/news/add"
                style={{
                  marginBottom: '30px',
                  display: 'block'
                }}
              >
                <Button type="primary" style={{ width: '100%' }}>
                  Add
                </Button>
              </Link>
            </Col>
          </Row>

          <List
            className="demo-loadmore-list"
            loading={false}
            itemLayout="horizontal"
            dataSource={this.props.news}
            renderItem={item => (
              <List.Item
                actions={[
                  <Link to={`/news/${item.id}/edit`}>edit</Link>,
                  <a
                    onClick={() => {
                      this.showConfirm(item);
                    }}
                  >
                    delete
                  </a>
                ]}
              >
                <List.Item.Meta title={<span>{item.title}</span>} />
              </List.Item>
            )}
          />
        </div>
      </DocumentTitle>
    );
  }
}

export default connect((state: common.StoreState) => {
  return {
    news: state.news.list.map(id => state.entities.news[id])
  };
})(News as any);
