import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import GooglePicker from 'react-google-picker';
import { Upload, Button, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import GoogleButton from 'react-google-button/dist/react-google-button';

import { PropertyBlock } from 'components';

const CLIENT_ID =
  '160790132410-cbp6okdeqhg6rkoj5pb5r40ouit5pki3.apps.googleusercontent.com';
const DEVELOPER_KEY = 'AIzaSyC1x3NtULJzGPFWvIZ7k3QwMlHdIKeC1LA';
const SCOPE = ['https://www.googleapis.com/auth/drive.readonly'];

const GoogleUploadInputBlock = ({
  tip,
  title,
  isLoading,
  isDisabled,
  defaultFileList,
  experimentIsSucceeded,
  handleUploadCancel,
  handleCreateGoogleDataset,
}) => {
  const [fileList, setFileList] = useState([]);
  const [googleToken, setGoogleToken] = useState(null);

  const showDangerMessage = useMemo(() => {
    return experimentIsSucceeded && defaultFileList?.length > 0;
  }, [defaultFileList?.length, experimentIsSucceeded]);

  const uploadProps = useMemo(() => {
    return {
      name: 'file',
      fileList: fileList,
      onChange(info) {
        let infoFileList = [...info.fileList];
        infoFileList = infoFileList.slice(-1);
        if (info.file.status === 'removed') {
          handleUploadCancel();
        }

        setFileList(infoFileList);
      },
    };
  }, [fileList, handleUploadCancel]);

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

  useEffect(() => {
    // Set the google token if user already logged
    if (window.gapi && window.gapi.auth) {
      setGoogleToken(window.gapi.auth.getToken());
    }

    if (defaultFileList) setFileList(defaultFileList);
  }, [defaultFileList]);

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
          <Typography.Text>
            <br />
            Ao alterar o arquivo, algumas tarefas vão precisar ser
            reconfiguradas!
          </Typography.Text>
        )}
      </PropertyBlock>
    </>
  );
};

GoogleUploadInputBlock.propTypes = {
  tip: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  defaultFileList: PropTypes.string,
  experimentIsSucceeded: PropTypes.bool.isRequired,
  handleUploadCancel: PropTypes.func.isRequired,
  handleCreateGoogleDataset: PropTypes.func.isRequired,
};

GoogleUploadInputBlock.defaultProps = {
  defaultFileList: undefined,
};

export default GoogleUploadInputBlock;
