import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import '../App.css';
import '../style/common.style.css';

const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const UPLOADPRESET = process.env.REACT_APP_CLOUDINARY_PRESET;

class CloudinaryUploadWidget extends Component {
  componentDidMount() {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: CLOUDNAME,
        uploadPreset: UPLOADPRESET,
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          console.log('Done! Here is the image info: ', result.info);
          document
            .getElementById('uploadedimage')
            .setAttribute('src', result.info.secure_url);
          this.props.uploadImage(result.info.secure_url); // 이 url은 스트링 값임
        }
      }, //https://cloudinary.com/documentation/react_image_and_video_upload
    );
    document.getElementById('upload_widget').addEventListener(
      'click',
      function () {
        myWidget.open();
      },
      false,
    );
  }

  render() {
    return (
      <button id="upload_widget" size="sm" className="ml-2 custom-btn">
        이미지 업로드
      </button>
    );
  }
}

export default CloudinaryUploadWidget;
