import React, { Component, Fragment, createRef } from 'react';
import Cropper from 'react-cropper';
import { connect } from 'react-redux';
import { Upload, Icon, Modal } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import 'cropperjs/dist/cropper.css';

import { convertToBase64 } from 'helpers/base64';
import { API_ROOT } from 'config';
import { users, entities, common } from 'teamboard-store';

type Props = {
  user: entities.User;
  dispatch: common.Dispatch;
};

type State = {
  previewVisible: boolean;
  cropImage: null | string;
};

class ImageUpload extends Component<Props, State> {
  cropper = createRef();

  state = {
    previewVisible: false,
    cropImage: null
  };

  onUpload = async () => {
    const file = (this.cropper.current as any).getCroppedCanvas().toDataURL();

    await this.props.dispatch(
      users.uploadImage({ file, purpose: 'user_image' })
    );

    this.setState({
      cropImage: null
    });
  };

  render() {
    const { previewVisible, cropImage } = this.state;
    const { user } = this.props;

    const fileList: UploadFile[] = [];

    if (user.image) {
      fileList.push({
        uid: Date.now(),
        url: API_ROOT + '/' + user.image,
        name: '',
        type: '',
        size: 0
      });
    }

    return (
      <Fragment>
        <Upload
          listType="picture-card"
          accept="image/*"
          fileList={fileList}
          onPreview={() =>
            this.setState({
              previewVisible: true
            })
          }
          onRemove={() => {
            this.props.dispatch(
              users.uploadImage({ purpose: 'user_image', file: '' })
            );
          }}
          customRequest={async d => {
            this.setState({
              cropImage: (await convertToBase64(d.file)) as string
            });

            d.onSuccess();
          }}
        >
          <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
          </div>
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={() => this.setState({ previewVisible: false })}
        >
          <img
            alt="example"
            style={{ width: '100%' }}
            src={API_ROOT + '/' + user.image}
          />
        </Modal>

        <Modal
          visible={!!cropImage}
          onCancel={() => this.setState({ cropImage: null })}
          onOk={this.onUpload}
          bodyStyle={{ padding: '50px' }}
        >
          <Cropper
            ref={this.cropper as any}
            src={cropImage as any}
            style={{ height: 400, width: '100%' }}
            aspectRatio={1}
            guides={false}
          />
        </Modal>
      </Fragment>
    );
  }
}

export default connect()(ImageUpload);
