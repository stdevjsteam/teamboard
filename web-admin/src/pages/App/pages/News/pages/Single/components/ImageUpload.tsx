import React, { Component, Fragment, createRef } from 'react';
import Cropper from 'react-cropper';
import { connect } from 'react-redux';
import { Upload, Icon, Modal } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import { ADMIN_ROOT } from 'config';
import 'cropperjs/dist/cropper.css';
import { convertToBase64 } from 'helpers/base64';

import { common } from 'teamboard-store';

type Props = {
  dispatch: common.Dispatch;
  image: any;
  handleUpload: any;
};

type State = {
  previewVisible: boolean;
  previewImage: any;
  cropImage: null | string;
  Base64: null | string;
};

class ImageUpload extends Component<Props, State> {
  cropper = createRef();

  state = {
    previewVisible: false,
    previewImage: '',
    cropImage: null,
    Base64: null
  };

  onUpload = async () => {
    const file = (this.cropper.current as any).getCroppedCanvas().toDataURL();
    this.setState({
      Base64: file,
      cropImage: null
    });

    this.props.handleUpload(file);
  };
  componentDidMount() {
    this.props.image &&
      this.setState({
        Base64: ADMIN_ROOT + '/' + this.props.image
      });
  }
  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };
  render() {
    const { previewVisible, cropImage } = this.state;
    const fileList: UploadFile[] = [];

    fileList.push({
      uid: Date.now(),
      url: `${this.state.Base64}`,
      name: '',
      type: '',
      size: 0
    });

    console.log('dedeedede', fileList);

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
            this.setState({
              Base64: null
            });
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
            src={`${this.state.Base64}`}
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

export default connect()(ImageUpload as any);

// import React, { Component } from 'react';
// import { Upload, Icon, Modal } from 'antd';
// import { convertToBase64 } from 'helpers/base64';
// // import { ADMIN_ROOT } from 'config';

// class ImageUpload extends Component<any, any> {
//   state = {
//     previewVisible: false,
//     previewImage: '',
//     fileList: [
//       //   {
//       //     uid: '-1',
//       //     name: 'xxx.png',
//       //     status: 'done',
//       //     url:
//       //       'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
//       //   }
//     ]
//   };
//   // componentDidMount() {
//   //   console.log('imageeeeeee', this.props.image);
//   //   this.props.image &&
//   //     this.setState({
//   //       fileList: [
//   //         ...this.state.fileList,
//   //         {
//   //           name: 'image.png',
//   //           status: 'done',
//   //           uid: Date.now(),
//   //           url: ADMIN_ROOT + '/' + this.props.image
//   //         }
//   //       ]
//   //     });
//   // }
//   handleCancel = () => this.setState({ previewVisible: false });

//   // handlePreview = file => {
//   //   this.setState({
//   //     previewImage: file.url || file.thumbUrl,
//   //     previewVisible: true
//   //   });
//   // };

//   handleChange = ({ fileList }) => {
//     this.setState({ fileList });
//     console.log(fileList[0].thumbUrl);
//     this.props.handleUpload(fileList[0].thumbUrl);
//   };

//   render() {
//     const { previewVisible, previewImage, fileList } = this.state;

//     const uploadButton = (
//       <div>
//         <Icon type="plus" />
//         <div className="ant-upload-text">Upload</div>
//       </div>
//     );
//     return (
//       <div className="clearfix">
//         <Upload
//           // action="//jsonplaceholder.typicode.com/posts/"
//           listType="picture-card"
//           // onPreview={this.handlePreview}
//           onChange={this.handleChange}
//           // fileList={fileList}
//           customRequest={async d => {
//             this.setState({
//               cropImage: (await convertToBase64(d.file)) as string
//             });
//           }}
//         >
//           {fileList.length >= 3 ? null : uploadButton}
//         </Upload>
//         <Modal
//           visible={previewVisible}
//           footer={null}
//           onCancel={this.handleCancel}
//         >
//           <img alt="example" style={{ width: '100%' }} src={previewImage} />
//         </Modal>
//       </div>
//     );
//   }
// }
// export default ImageUpload;
