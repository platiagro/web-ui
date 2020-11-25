// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { FundOutlined } from '@ant-design/icons';
import { Button, Tooltip, Upload } from 'antd';

/**
 * Upload Inference Test Button.
 * This component is responsible for displaying upload inference test button.
 */
const UploadInferenceTestButton = ({ handleUpload }) => {
  // upload props
  const props = {
    name: 'file',
    showUploadList: false,
    accept: '*',
  };

  // RENDER
  return (
    // upload component
    <Upload
      beforeUpload={(file) => {
        handleUpload(file);
      }}
      {...props}
    >
      <Tooltip placement='bottom' title='Testar o fluxo'>
        <Button size='large' style={{ padding: 0 }} type='link'>
          <FundOutlined />
        </Button>
      </Tooltip>
    </Upload>
  );
};

// PROP TYPES
UploadInferenceTestButton.propTypes = {
  /** upload inference test button upload handle */
  handleUpload: PropTypes.func.isRequired,
};

// EXPORT
export default UploadInferenceTestButton;
