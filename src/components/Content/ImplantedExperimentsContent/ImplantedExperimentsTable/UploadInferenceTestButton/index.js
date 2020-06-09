// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Upload, Icon } from 'antd';

/**
 * Upload Inference Test Button.
 * This component is responsible for displaying upload inference test button.
 */
const UploadInferenceTestButton = ({ handleUpload }) => {
  // FUNCTIONS
  // handle upload action
  // const handleAction = (file) =>
  //   new Promise((resolve, reject) => {
  //     resolve(handleUpload(file));
  //   });

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
          const result = e.target.result.trim().split('\n');
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
      <a>
        <Icon type='upload' style={{ marginRight: 5 }} />
        Testar Inferência
      </a>
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
