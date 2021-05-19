import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip, Upload } from 'antd';
import { FundOutlined } from '@ant-design/icons';

const UploadInferenceTestButton = ({ disabled, handleUpload }) => {
  return (
    <Upload
      accept='*'
      name='file'
      disabled={disabled}
      showUploadList={false}
      beforeUpload={handleUpload}
    >
      <Tooltip placement='bottom' title='Testar o fluxo'>
        <Button
          disabled={disabled}
          size='large'
          style={{ padding: 0 }}
          type='link'
        >
          <FundOutlined />
        </Button>
      </Tooltip>
    </Upload>
  );
};

UploadInferenceTestButton.propTypes = {
  handleUpload: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default UploadInferenceTestButton;
