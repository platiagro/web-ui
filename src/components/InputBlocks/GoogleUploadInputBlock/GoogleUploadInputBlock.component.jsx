// REACT LIBS
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// Fix Jest errors by importing from react-google-button/dist/react-google-button
import GoogleButton from 'react-google-button/dist/react-google-button';
import GooglePicker from 'react-google-picker';

// UI LIB COMPONENTS
import { UploadOutlined } from '@ant-design/icons';
import { Upload, Button, Typography } from 'antd';

// COMPONENTS
import { PropertyBlock } from 'components';

const { Text } = Typography;

// GOOGLE CREDENTIALS
const CLIENT_ID =
  '160790132410-cbp6okdeqhg6rkoj5pb5r40ouit5pki3.apps.googleusercontent.com';
const DEVELOPER_KEY = 'AIzaSyC1x3NtULJzGPFWvIZ7k3QwMlHdIKeC1LA';
const SCOPE = ['https://www.googleapis.com/auth/drive.readonly'];

/**
 * A input block with upload input
 *
 * @param {object} props Component props
 * @returns {GoogleUploadInputBlock} Component
 */
const GoogleUploadInputBlock = (props) => {
  const {
    defaultFileList,
    isDisabled,
    isLoading,
    tip,
    title,
    experimentIsSucceeded,
  } = props;
  const { handleCreateGoogleDataset, handleUploadCancel } = props;
  const [fileList, setFileList] = useState([]);
  const [googleToken, setGoogleToken] = useState(null);

  const showDangerMessage =
    experimentIsSucceeded && defaultFileList?.length > 0;

  useEffect(() => {
    // set the google token if user already logged
    if (window.gapi && window.gapi.auth) {
      setGoogleToken(window.gapi.auth.getToken());
    }
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

  const handleGooglePickerOnChange = (data) => {
    if (data.action === 'loaded') {
      const token = window.gapi.auth.getToken();
      setGoogleToken(token);
    }

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
  };

  // rendering component
  return (
    <>
      <PropertyBlock tip={tip} title={title}>
        <GooglePicker
          disabled={isDisabled || isLoading}
          clientId={CLIENT_ID}
          developerKey={DEVELOPER_KEY}
          scope={SCOPE}
          onChange={handleGooglePickerOnChange}
          navHidden={true}
          authImmediate={false}
          viewId={'DOCS'}
        >
          {googleToken ? (
            <Button disabled={isDisabled || isLoading}>
              <UploadOutlined /> Importar
            </Button>
          ) : (
            <GoogleButton style={{ width: 210 }} type='dark' />
          )}
        </GooglePicker>
        <Upload {...uploadProps} disabled={isDisabled} />
        {showDangerMessage && (
          <Text>
            <br />
            Ao alterar o arquivo, algumas tarefas vão precisar ser
            reconfiguradas!
          </Text>
        )}
      </PropertyBlock>
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

  /** Experiment training is succeed */
  experimentIsSucceeded: PropTypes.bool.isRequired,
};

// DEFAULT PROPS
GoogleUploadInputBlock.defaultProps = {
  /** Uploaded file name */
  defaultFileList: undefined,
};

// EXPORT DEFAULT
export default GoogleUploadInputBlock;
