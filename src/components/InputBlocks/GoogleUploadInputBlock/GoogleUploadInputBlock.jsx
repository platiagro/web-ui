// REACT LIBS
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GoogleButton from 'react-google-button';
import GooglePicker from 'react-google-picker';

// UI LIB COMPONENTS
import { Upload } from 'antd';

// COMPONENTS
import { InputBlockContainer } from 'components';

// GOOGLE CREDENTIALS
const CLIENT_ID =
  '438861478238-uq13v0ho59r44dh9j5a05agg4ap3ujs7.apps.googleusercontent.com';
const DEVELOPER_KEY = 'AIzaSyDAoTfHvUJO-Gent8_FmW1oDnvRg-8dXlI';
const SCOPE = ['https://www.googleapis.com/auth/drive.readonly'];

/**
 * A input block with upload input
 *
 * @param {object} props Component props
 * @returns {GoogleUploadInputBlock} Component
 */
const GoogleUploadInputBlock = (props) => {
  const { defaultFileList, isDisabled, isLoading, tip, title } = props;
  const { handleCreateGoogleDataset, handleUploadCancel } = props;
  const [fileList, setFileList] = useState([]);

  // file list state hook
  // Similar ao componentDidMount e componentDidUpdate:
  useEffect(() => {
    defaultFileList && setFileList(defaultFileList);
  }, [defaultFileList]);

  // upload props
  const uploadProps = {
    name: 'file',
    fileList: fileList,
    onChange(info) {
      // getting info file list
      let infoFileList = [...info.fileList];

      // limiting number of files
      infoFileList = infoFileList.slice(-1);

      if (info.file.status === 'removed') {
        // upload cancel
        handleUploadCancel();
      }

      // setting file list
      setFileList(infoFileList);
    },
  };

  // rendering component
  return (
    <>
      <InputBlockContainer tip={tip} title={title}>
        <Upload {...uploadProps} disabled={isDisabled} />
        <br />
        <GooglePicker
          disabled={isDisabled || isLoading}
          clientId={CLIENT_ID}
          developerKey={DEVELOPER_KEY}
          scope={SCOPE}
          onChange={(data) => {
            if (data.action === 'picked') {
              const file = data.docs[0];
              const token = window.gapi.auth.getToken();
              const gfile = {
                clientId: CLIENT_ID,
                clientSecret: DEVELOPER_KEY,
                id: file.id,
                mimeType: file.mimeType,
                name: file.name,
                token: token.access_token,
              };
              handleCreateGoogleDataset(gfile);
            }
          }}
          navHidden={true}
          authImmediate={false}
          viewId={'DOCS'}
        >
          <GoogleButton
            style={{ width: 210 }}
            type='dark'
            disabled={isDisabled || isLoading}
          />
        </GooglePicker>
      </InputBlockContainer>
    </>
  );
};

// PROP TYPES
GoogleUploadInputBlock.propTypes = {
  /** Uploaded file name */
  defaultFileList: PropTypes.string,

  /** Create Google dataset handler */
  handleCreateGoogleDataset: PropTypes.func.isRequired,

  /** Upload cancel handler */
  handleUploadCancel: PropTypes.func.isRequired,

  /** Upload is disabled */
  isDisabled: PropTypes.bool.isRequired,

  /** Upload is loading */
  isLoading: PropTypes.bool.isRequired,

  /** Upload tip text */
  tip: PropTypes.string.isRequired,

  /** Upload title */
  title: PropTypes.string.isRequired,
};

// DEFAULT PROPS
GoogleUploadInputBlock.defaultProps = {
  /** Uploaded file name */
  defaultFileList: undefined,
};

// EXPORT DEFAULT
export default GoogleUploadInputBlock;
