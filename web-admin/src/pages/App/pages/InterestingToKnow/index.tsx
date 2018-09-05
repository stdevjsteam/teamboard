import React, { Component } from "react";
import { List, Button, Modal, Row, Col } from "antd";
import DocumentTitle from "react-document-title";
import { connect } from "react-redux";
import { interestingToKnow, entities, common } from "teamboard-store";
import { Link } from "react-router-dom";

type Props = {
  interestingToKnow: entities.InterestingToKnow[];
  dispatch: common.Dispatch;
};

class InterestingToKnow extends Component<Props> {
  static loadData = ({ store }) => {
    return store.dispatch(interestingToKnow.fetchInterestingToKnow());
  };

  showConfirm = ({ title, id }: entities.InterestingToKnow) => {
    const { dispatch } = this.props;

    Modal.confirm({
      title: `Do you want to delete "${title}" ?`,
      onOk() {
        dispatch(interestingToKnow.deleteInterestingToKnow(id));
      }
    });
  };

  render() {
    return (
      <DocumentTitle title="interestingToKnow">
        <div>
          <Row type="flex" justify="end">
            <Col xs={24} md={2}>
              <Link
                to="/interestingToKnow/add"
                style={{
                  marginBottom: "30px",
                  display: "block"
                }}
              >
                <Button type="primary" style={{ width: "100%" }}>
                  Add
                </Button>
              </Link>
            </Col>
          </Row>

          <List
            className="demo-loadmore-list"
            loading={false}
            itemLayout="horizontal"
            dataSource={this.props.interestingToKnow}
            renderItem={item => (
              <List.Item
                actions={[
                  <Link to={`/interestingToKnow/${item.id}/edit`}>edit</Link>,
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
    interestingToKnow: state.interestingToKnow.list.map(
      id => state.entities.interestingToKnow[id]
    )
  };
})(InterestingToKnow as any);
