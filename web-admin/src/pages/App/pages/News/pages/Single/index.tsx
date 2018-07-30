import React from 'react';
import { Input, Button, Row, Col, message } from 'antd';
import { connect } from 'react-redux';
import {
  MegadraftEditor,
  editorStateFromRaw,
  editorStateToJSON
} from 'megadraft';
import 'megadraft/dist/css/megadraft.css';
import DocumentTitle from 'react-document-title';
import { news, common } from 'teamboard-store';

class News extends React.Component<any, any> {
  state = { editorState: editorStateFromRaw(null), title: '' };

  static loadData({ store, match }) {
    if (!match.params.id) {
      return;
    }

    return store.dispatch(news.fetchCurrentNews(match.params.id));
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      const { currentNews } = this.props;

      this.setState({
        title: currentNews.title,
        editorState: editorStateFromRaw(JSON.parse(currentNews.body))
      });
    }
  }

  componentWillUnmount() {
    this.props.dispatch(news.clearCurrentNews());
  }

  onChange = editorState => {
    this.setState({ editorState });
  };

  onAdd = async () => {
    const { editorState, title } = this.state;
    const { dispatch, history } = this.props;

    const { response } = await dispatch(
      news.createNews({
        body: editorStateToJSON(editorState),
        title: title
      })
    );

    if (response) {
      message.success(`"${title}" is successfully added`);
      history.push('/');
    }
  };

  onEdit = async () => {
    const { editorState, title } = this.state;
    const { dispatch, history, match } = this.props;

    const { response } = await dispatch(
      news.updateNews(match.params.id, {
        body: editorStateToJSON(editorState),
        title: title
      })
    );

    if (response) {
      message.success(`"${title}" is successfully updated`);
      history.push('/');
    }
  };

  render() {
    const { currentNews } = this.props;

    return (
      <DocumentTitle title={currentNews ? currentNews.title : 'Add News'}>
        <div style={{ padding: '20px 60px' }}>
          <Row gutter={16} style={{ marginBottom: '30px' }}>
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
                onClick={currentNews ? this.onEdit : this.onAdd}
              >
                {currentNews ? 'Edit' : 'Add'}
              </Button>
            </Col>
          </Row>
          <MegadraftEditor
            editorState={this.state.editorState}
            onChange={this.onChange}
            placeholder="Let's build your news together :)"
          />
        </div>
      </DocumentTitle>
    );
  }
}

const mapStateToProps = (state: common.StoreState) => {
  return {
    currentNews: state.entities.news[state.news.current!]
  };
};

export default connect(mapStateToProps)(News);
