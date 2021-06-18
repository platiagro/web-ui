import React, { useState, useEffect } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Upload, Button } from 'antd';
import PropTypes from 'prop-types';

const UploadButton = (props) => {
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

  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    defaultFileList ? setFileList(defaultFileList) : setFileList([]);
  }, [actionUrl, defaultFileList]);

  const handleChange = (info) => {
    let infoFileList = [...info.fileList];
    infoFileList = infoFileList.slice(-1);

    if (info.file.status === 'done') {
      const dataset = infoFileList[0].response;
      handleUploadSuccess(dataset.columns);
    } else if (info.file.status === 'error') {
      const defaultErrorMessage =
        'Ocorreu um erro no processamento do arquivo.';
      infoFileList[0].response = defaultErrorMessage;
      handleUploadFail(defaultErrorMessage);
    } else if (info.file.status === 'removed') {
      handleUploadCancel('Envio cancelado.');
    }

    setFileList(infoFileList);
  };

  return (
    <Upload
      method={method}
      action={actionUrl}
      fileList={fileList}
      name={parameterName}
      disabled={isDisabled}
      onChange={handleChange}
      beforeUpload={handleUploadStart}
    >
      <Button disabled={isDisabled || isLoading}>
        <UploadOutlined /> {buttonText}
      </Button>
    </Upload>
  );
};

UploadButton.propTypes = {
  actionUrl: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  parameterName: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  handleUploadCancel: PropTypes.func,
  handleUploadFail: PropTypes.func.isRequired,
  handleUploadStart: PropTypes.func.isRequired,
  handleUploadSuccess: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  defaultFileList: PropTypes.string,
};

UploadButton.defaultProps = {
  defaultFileList: undefined,
  handleUploadStart: undefined,
};

export default UploadButton;
