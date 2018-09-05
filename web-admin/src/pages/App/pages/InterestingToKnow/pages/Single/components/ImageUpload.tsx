import React, { Component, Fragment, createRef } from "react";
import Cropper from "react-cropper";
import { connect } from "react-redux";
import { Upload, Icon, Modal } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import "cropperjs/dist/cropper.css";

import { convertToBase64 } from "helpers/base64";
import config from "teamboard-store/dist/config";
import { interestingToKnow, entities, common } from "teamboard-store";

const { API_ROOT } = config;

type Props = {
  _interestingToKnow: entities.InterestingToKnow;
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
      interestingToKnow.uploadPhoto({
        file,
        purpose: "interestingToKnow_photo"
      })
    );

    this.setState({
      cropImage: null
    });
  };

  render() {
    const { previewVisible, cropImage } = this.state;
    const { _interestingToKnow } = this.props;

    const fileList: UploadFile[] = [];

    if (_interestingToKnow) {
      fileList.push({
        uid: Date.now(),
        url: API_ROOT + "/" + _interestingToKnow.photo,
        name: "",
        type: "",
        size: 0
      });
    }
    const photo = _interestingToKnow ? _interestingToKnow.photo : "";
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
              interestingToKnow.uploadPhoto({ purpose: "user_photo", file: "" })
            );
          }}
          customRequest={async d => {
            this.setState({
              cropImage: (await convertToBase64(d.file)) as string
            });
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
            style={{ width: "100%" }}
            src={API_ROOT + "/" + photo}
          />
        </Modal>

        <Modal
          visible={!!cropImage}
          onCancel={() => this.setState({ cropImage: null })}
          onOk={this.onUpload}
          bodyStyle={{ padding: "50px" }}
        >
          <Cropper
            ref={this.cropper as any}
            src={cropImage as any}
            style={{ height: 400, width: "100%" }}
            aspectRatio={1}
            guides={false}
          />
        </Modal>
      </Fragment>
    );
  }
}

export default connect()(ImageUpload);
