// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { FundOutlined } from '@ant-design/icons';
import { Button, Tooltip, Upload } from 'antd';

// EXTENSION LIBS
import { getEncoding } from 'istextorbinary';

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
        const reader = new FileReader();
        let [type, subtype] = file.type.split('/');
        const isImageOrVideo = ['image', 'video'].includes(type);

        if (type === '') {
          // Some browsers draws the MIME types from the operating system,
          // so if you OS knows the correct MIME type for .csv or .txt, the browser
          // would show it as well. Please, check the settings of your OS.
          const extensionPattern = /(?:\.([^.]+))?$/;
          const extension = extensionPattern.exec(file.name);

          if (extension) {
            type = 'text';
            subtype = extension.shift().replace('.', '');
          }
        }

        reader.onload = (e) => {
          let obj;

          if (subtype === undefined) {
            // there's no explicit extension, therefore, the encoding is validated
            subtype = getEncoding(file) === 'utf8' ? 'plain' : undefined;
            type = subtype === 'plain' ? 'text' : undefined;
          }

          if (isImageOrVideo || (type === 'text' && subtype !== 'csv')) {
            obj = {
              strData: e.target.result,
            };
          } else if (subtype === 'csv') {
            // need to remove the windows end of line
            const result = e.target.result
              .trim()
              .replace(/\r/g, '')
              .split('\n');
            const [names, ...ndarray] = result;
            obj = {
              data: {
                names: names.split(','),
                ndarray: ndarray.map((el) => el.split(',')),
              },
            };
          } else {
            obj = {
              binData: btoa(unescape(encodeURIComponent(e.target.result))),
            };
          }
          handleUpload(obj);
        };

        isImageOrVideo ? reader.readAsDataURL(file) : reader.readAsText(file);
        return false;
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
