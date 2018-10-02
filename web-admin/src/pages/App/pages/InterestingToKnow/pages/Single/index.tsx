import React, { Fragment } from 'react';
import { Input, Form, Button, Row, Col, Checkbox, message } from 'antd';
import { match } from 'react-router';
import { connect } from 'react-redux';
import {
  MegadraftEditor,
  editorStateFromRaw,
  editorStateToJSON
} from 'megadraft';
import 'megadraft/dist/css/megadraft.css';
import DocumentTitle from 'react-document-title';
import { interestingToKnow, groups, common, entities } from 'teamboard-store';
import { History } from 'history';
import ImageUpload from './components/ImageUpload';
import Select from './components/Select';
import { FormComponentProps } from 'antd/lib/form';
type Props = {
  // _news: entities.News;
  groups: entities.Groups[];
  currentInterestingToKnow: any;
  myGroups: any;
  child: any;
  history: History;
  dispatch: common.Dispatch;
  match: match<{ id: common.Id }>;
} & FormComponentProps;
type State = {
  editorState: any;
  title: string;
  commentsAllow: boolean;
  id: common.Id | null;
  imageBase64: any;
};
class InterestingToKnowItem extends React.Component<Props, State> {
  child = null;
  state = {
    editorState: editorStateFromRaw(null),
    title: '',
    commentsAllow: true,
    id: null,
    imageBase64: ''
  };
  static loadData = ({ store, match }) => {
    const promises: Promise<any>[] = [store.dispatch(groups.fetchGroups())];

    if (match.params.id) {
      promises.push(
        store.dispatch(
          interestingToKnow.fetchCurrentInterestingToKnow(match.params.id)
        )
      );
    }

    return Promise.all(promises);
  };
  componentDidMount() {
    if (this.props.match.params.id) {
      const { currentInterestingToKnow } = this.props;
      this.setState({
        title: currentInterestingToKnow.title,
        editorState: editorStateFromRaw(
          JSON.parse(currentInterestingToKnow.description)
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
    const file = this.state.imageBase64;

    const response = await dispatch(
      interestingToKnow.createInterestingToKnow({
        description: editorStateToJSON(editorState),
        title: title,
        commentsOpen: this.state.commentsAllow
      })
    );

    const currentInterestingToKnowGroups = await (this.child as any).onMethod();
    console.log(
      'currentInterestingToKnowGroups',
      currentInterestingToKnowGroups
    );
    const mydata = currentInterestingToKnowGroups.interestingToKnowGroups.map(
      data => data.id
    );

    if (mydata.length > 0 && !(response as any).error) {
      await this.props.dispatch(
        interestingToKnow.addGroups((response as any).response.result, {
          groupIds: mydata
        })
      );
    }

    if (!(response as any).error) {
      await this.props.dispatch(
        interestingToKnow.uploadImage({
          file,
          newsId: 167,
          // newsId: (response as any).response.result,
          purpose: 'news_image'
        })
      );
    }
    if (!(response as any).error) {
      message.success(`"${title}" is successfully added`);
      history.push('/interesting-to-knows');
    }
  };
  onhandleUpload = file => {
    this.setState({
      imageBase64: file
    });
  };
  onEdit = async () => {
    const { editorState, title } = this.state;
    const { dispatch, history, match } = this.props;

    const response = await dispatch(
      interestingToKnow.updateInterestingToKnow(match.params.id, {
        description: editorStateToJSON(editorState),
        title: title
      })
    );
    const mydata = await (this.child as any).onMethod();

    if (mydata.addGroups.length > 0) {
      await this.props.dispatch(
        interestingToKnow.addGroups((response as any).response.result, {
          groupIds: mydata.addGroups
        })
      );
    }
    if (mydata.deleteGroups.length > 0) {
      await this.props.dispatch(
        interestingToKnow.deleteGroups((response as any).response.result, {
          groupIds: mydata.deleteGroups
        })
      );
    }
    if (this.state.imageBase64) {
      await this.props.dispatch(
        interestingToKnow.uploadImage({
          file: this.state.imageBase64,
          newsId: 167,
          // newsId: (response as any).response.result,
          purpose: 'news_image'
        })
      );
    }
    if (response) {
      message.success(`"${title}" is successfully updated`);
      history.push('/');
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
    console.log('current interesting to know', currentInterestingToKnow);
    return (
      <Fragment>
        <DocumentTitle
          title={
            currentInterestingToKnow
              ? currentInterestingToKnow.title
              : 'Add News'
          }
        >
          <div style={{ padding: '20px 60px' }}>
            <Row gutter={16} style={{ marginBottom: '30px' }}>
              <Form.Item {...formItemLayout} label="Photo">
                <ImageUpload
                  handleUpload={this.onhandleUpload}
                  image={
                    this.props.match.params.id
                      ? this.props.currentInterestingToKnow.image
                      : ''
                  }
                />
              </Form.Item>
              <Col xs={24} md={20} style={{ marginBottom: '10px' }}>
                <Input
                  placeholder="Type the name of the news"
                  value={this.state.title}
                  onChange={e => {
                    this.setState({ title: e.target.value });
                  }}
                />
              </Col>

              <Col xs={24} md={4}>
                <Button
                  type="primary"
                  style={{ width: '100%' }}
                  onClick={currentInterestingToKnow ? this.onEdit : this.onAdd}
                >
                  {currentInterestingToKnow ? 'Edit' : 'Add'}
                </Button>
              </Col>
            </Row>

            <Checkbox
              onChange={this.handleCheckbox}
              defaultChecked={this.state.commentsAllow}
            >
              {this.state.commentsAllow
                ? 'Comments Allowed'
                : 'Comments Disallowed'}
            </Checkbox>
            <Col>
              <MegadraftEditor
                editorState={this.state.editorState}
                onChange={this.onChange}
                placeholder="Let's build your news together :)"
              />
            </Col>
            <Col>
              <Select
                wrappedComponentRef={ref => {
                  this.child = ref;
                }}
                myGroups={this.props.groups}
                defaultGroups={
                  currentInterestingToKnow
                    ? currentInterestingToKnow.groups
                    : ''
                }
                id={this.props.match.params.id}
              />
            </Col>
          </div>
        </DocumentTitle>
      </Fragment>
    );
  }
}
const mapStateToProps = (state: common.StoreState) => {
  return {
    currentInterestingToKnow:
      state.entities.interestingToKnow[state.interestingToKnow.current!],
    groups: state.groups.list.map(id => state.entities.groups[id])
  };
};

export default connect(mapStateToProps)(InterestingToKnowItem as any);
