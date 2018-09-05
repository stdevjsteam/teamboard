import React, { Fragment } from "react";
import { Input, Form, Button, Row, Col, Checkbox, message } from "antd";
import { connect } from "react-redux";
import {
  MegadraftEditor,
  editorStateFromRaw,
  editorStateToJSON
} from "megadraft";
import "megadraft/dist/css/megadraft.css";
import DocumentTitle from "react-document-title";
import { interestingToKnow, common, entities } from "teamboard-store";
import ImageUpload from "./components/ImageUpload";
type Props = {
  _interestingToKnow: entities.InterestingToKnow;
};
class InterestingToKnowItem extends React.Component<Props & any> {
  state = {
    editorState: editorStateFromRaw(null),
    title: "",
    commentsAllow: true
  };

  static loadData({ store, match }) {
    if (!match.params.id) {
      return;
    }

    return store.dispatch(
      interestingToKnow.fetchCurrentInterestingToKnow(match.params.id)
    );
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      const { currentInterestingToKnow } = this.props;

      this.setState({
        title: currentInterestingToKnow.title,
        editorState: editorStateFromRaw(
          JSON.parse(currentInterestingToKnow.body)
        )
      });
    }
  }

  componentWillUnmount() {
    this.props.dispatch(interestingToKnow.clearCurrentInterestingToKnow());
  }

  onChange = editorState => {
    this.setState({ editorState });
  };
  handleCheckbox = e => {
    this.setState({
      commentsAllow: e.target.checked
    });
  };
  onAdd = async () => {
    const { editorState, title } = this.state;
    const { dispatch, history } = this.props;

    const { response } = await dispatch(
      interestingToKnow.createInterestingToKnow({
        body: editorStateToJSON(editorState),
        title: title
      })
    );

    if (response) {
      message.success(`"${title}" is successfully added`);
      history.push("/interesting_to_know");
    }
  };

  onEdit = async () => {
    const { editorState, title } = this.state;
    const { dispatch, history, match } = this.props;

    const { response } = await dispatch(
      interestingToKnow.updateInterestingToKnow(match.params.id, {
        body: editorStateToJSON(editorState),
        title: title
      })
    );

    if (response) {
      message.success(`"${title}" is successfully updated`);
      history.push("/interesting_to_know");
    }
  };

  render() {
    const { currentInterestingToKnow } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      }
    };

    return (
      <Fragment>
        <DocumentTitle
          title={
            currentInterestingToKnow
              ? currentInterestingToKnow.title
              : "Add Interesting To Know"
          }
        >
          <div style={{ padding: "20px 60px" }}>
            <Row gutter={16} style={{ marginBottom: "30px" }}>
              <Form.Item {...formItemLayout} label="Photo">
                <ImageUpload _interestingToKnow={currentInterestingToKnow} />
              </Form.Item>
              <Col xs={24} md={20} style={{ marginBottom: "10px" }}>
                <Input
                  placeholder="Type the name of the interesting to know"
                  value={this.state.title}
                  onChange={e => {
                    this.setState({ title: e.target.value });
                  }}
                />
              </Col>
              <Col xs={24} md={4}>
                <Button
                  type="primary"
                  style={{ width: "100%" }}
                  onClick={currentInterestingToKnow ? this.onEdit : this.onAdd}
                >
                  {currentInterestingToKnow ? "Edit" : "Add"}
                </Button>
              </Col>
            </Row>
            <div>
              <Checkbox
                onChange={this.handleCheckbox}
                defaultChecked={this.state.commentsAllow}
              >
                {this.state.commentsAllow
                  ? "Comments Allowed"
                  : "Comments Disallowed"}
              </Checkbox>
            </div>
            <MegadraftEditor
              editorState={this.state.editorState}
              onChange={this.onChange}
              placeholder="Let's build your interesting To Know together :)"
            />
          </div>
        </DocumentTitle>
      </Fragment>
    );
  }
}

const mapStateToProps = (state: common.StoreState) => {
  return {
    currentInterestingToKnow:
      state.entities.interestingToKnow[state.interestingToKnow.current!]
  };
};

export default connect(mapStateToProps)(InterestingToKnowItem);
