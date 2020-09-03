// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { UploadOutlined } from '@ant-design/icons';
import { Upload, Button } from 'antd';

/**
 * Upload Inference Test Button.
 * This component is responsible for displaying upload inference test button.
 */
const UploadInferenceTestButton = ({ handleUpload }) => {
  // upload props
  const props = {
    name: 'file',
    showUploadList: false,
    accept: '.csv',
  };

  // RENDER
  return (
    // upload component
    <Upload
      beforeUpload={(file) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          // need to remove the windows end of line
          const result = e.target.result.trim().replace(/\r/g, '').split('\n');
          const [names, ...ndarray] = result;
          const obj = {
            data: {
              names: names.split(','),
              ndarray: ndarray.map((el) => el.split(',')),
            },
          };
          handleUpload(obj);
        };
        reader.readAsText(file);
        return false;
      }}
      {...props}
    >
      {/* upload button link */}
      <Button type='link'>
        <UploadOutlined style={{ marginRight: 5 }} />
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
