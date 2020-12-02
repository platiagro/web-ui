// REACT LIBS
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// UI LIB COMPONENTS
import { UploadOutlined } from '@ant-design/icons';
import { Upload, Button } from 'antd';

const UploadButton = (props) => {
  // destructuring props
  const {
    actionUrl,
    buttonText,
    handleUploadFail,
    handleUploadCancel = handleUploadFail,
    handleUploadStart,
    handleUploadSuccess,
    isDisabled,
    isLoading,
    defaultFileList,
    method,
    parameterName,
  } = props;

  //
  const [fileList, setFileList] = useState([]);

  // file list state hook
  // Similar ao componentDidMount e componentDidUpdate:
  useEffect(() => {
    defaultFileList ? setFileList(defaultFileList) : setFileList([]);
  }, [actionUrl, defaultFileList]);

  // default error message
  const defaultErrorMessage = 'Ocorreu um erro no processamento do arquivo.';

  // upload props
  const uploadProps = {
    name: parameterName,
    fileList: fileList,
    action: actionUrl,
    method: method,
    beforeUpload() {
      handleUploadStart();
    },
    onChange(info) {
      // getting info file list
      let infoFileList = [...info.fileList];

      // limiting number of files
      infoFileList = infoFileList.slice(-1);

      if (info.file.status === 'done') {
        // getting dataset
        const dataset = infoFileList[0].response;

        // upload success
        handleUploadSuccess(dataset.columns);
      } else if (info.file.status === 'error') {
        // set error message
        infoFileList[0].response = defaultErrorMessage;

        // upload fail
        handleUploadFail(defaultErrorMessage);
      } else if (info.file.status === 'removed') {
        // upload cancel
        handleUploadCancel('Envio cancelado.');
      }

      // setting file list
      setFileList(infoFileList);
    },
  };

  // rendering component
  return (
    <Upload {...uploadProps} disabled={isDisabled}>
      <Button disabled={isDisabled || isLoading}>
        <UploadOutlined /> {buttonText}
      </Button>
    </Upload>
  );
};

// PROP TYPES
UploadButton.propTypes = {
  /** Upload action url */
  actionUrl: PropTypes.string.isRequired,

  /** Upload method (post, get, patch) */
  method: PropTypes.string.isRequired,

  /** Upload paramenter name  */
  parameterName: PropTypes.string.isRequired,

  /** Upload button text */
  buttonText: PropTypes.string.isRequired,

  /** Upload cancel handler */
  handleUploadCancel: PropTypes.func,

  /** Upload fail handler */
  handleUploadFail: PropTypes.func.isRequired,

  /** Upload start handler */
  handleUploadStart: PropTypes.func.isRequired,

  /** Upload success handler */
  handleUploadSuccess: PropTypes.func.isRequired,

  /** Upload is disabled */
  isDisabled: PropTypes.bool.isRequired,

  /** Upload is loading */
  isLoading: PropTypes.bool.isRequired,

  /** Uploaded file name */
  defaultFileList: PropTypes.string,
};

// DEFAULT PROPS
UploadButton.defaultProps = {
  /** Uploaded file name */
  defaultFileList: undefined,
  handleUploadStart: () => console.log('Starting'),
};

// EXPORT DEFAULT
export default UploadButton;
