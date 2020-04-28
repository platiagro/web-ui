// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Upload, Button, Icon } from 'antd';

/**
 * Upload Inference Test Button.
 * This component is responsible for displaying upload inference test button.
 */
const UploadInferenceTestButton = ({ handleUpload }) => {
  // FUNCTIONS
  // handle upload action
  const handleAction = (file) =>
    new Promise((resolve, reject) => {
      resolve(handleUpload(file));
    });

  // upload props
  const props = {
    name: 'file',
    action: handleAction,
    showUploadList: false,
  };

  // RENDER
  return (
    // upload component
    <Upload {...props}>
      {/* upload button link */}
      <Button type='link'>
        <Icon type='upload' style={{ marginRight: -5 }} />
        Testar Inferência
      </Button>
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
