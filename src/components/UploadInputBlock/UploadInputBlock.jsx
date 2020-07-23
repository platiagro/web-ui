// REACT LIBS
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// UI LIB COMPONENTS
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Upload, Button } from 'antd';

// COMPONENTS
import { InputBlock } from 'components';

/**
 * A input block with upload input
 *
 * @param {object} props Component props
 * @returns {UploadInputBlock} Component
 * @component
 * @example
 * // Upload action url
 * const actionUrl = 'https://www.mocky.io/v2/5cc8019d300000980a055e76';
 * // Upload button text
 * const buttonText = 'Upload Button';
 * // Upload cancel handler
 * const handleUploadCancel = () => alert('handleUploadCancel');
 * // Upload fail handler
 * const handleUploadFail = () => alert('handleUploadFail');
 * // Upload start handler
 * const handleUploadStart = () => alert('handleUploadStart');
 * // Upload success handler
 * const handleUploadSuccess = () => alert('handleUploadSuccess');
 * // Upload is disabled
 * const isDisabled = false;
 * // Upload is loading
 * const isLoading = false;
 * // Upload tip text
 * const tip = 'This is a tip!';
 * // Upload title
 * const title = 'Upload';
 *
 * return (
 *  <div>
 *    <UploadInputBlock
 *      actionUrl={actionUrl}
 *      buttonText={buttonText}
 *      handleUploadCancel={handleUploadCancel}
 *      handleUploadFail={handleUploadFail}
 *      handleUploadStart={handleUploadStart}
 *      handleUploadSuccess={handleUploadSuccess}
 *      isDisabled={isDisabled}
 *      isLoading={isLoading}
 *      tip={tip}
 *      title={title}
 *    />
 *  </div>
 * );
 */
const UploadInputBlock = (props) => {
  // destructuring props
  const {
    actionUrl,
    buttonText,
    handleUploadCancel,
    handleUploadFail,
    handleUploadStart,
    handleUploadSuccess,
    isDisabled,
    isLoading,
    tip,
    title,
  } = props;

  // file list state hook
  const [fileList, setFileList] = useState([]);

  // button icon
  const buttonIcon = isLoading ? 'loading' : 'upload';

  // default error message
  const defaultErrorMessage = 'Ocorreu um erro no processamento do arquivo.';

  // upload props
  const uploadProps = {
    name: 'file',
    fileList: fileList,
    action: actionUrl,
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
        handleUploadSuccess(dataset);
      } else if (info.file.status === 'error') {
        // set error message
        infoFileList[0].response = defaultErrorMessage;

        // upload fail
        handleUploadFail();
      } else if (info.file.status === 'removed') {
        // upload cancel
        handleUploadCancel();
      }

      // setting file list
      setFileList(infoFileList);
    },
  };

  // rendering component
  return (
    <InputBlock tip={tip} title={title}>
      <Upload {...uploadProps} disabled={isDisabled}>
        <Button disabled={isDisabled}>
          <LegacyIcon type={buttonIcon} /> {buttonText}
        </Button>
      </Upload>
    </InputBlock>
  );
};

// PROP TYPES
UploadInputBlock.propTypes = {
  /** Upload action url */
  actionUrl: PropTypes.string.isRequired,

  /** Upload button text */
  buttonText: PropTypes.string.isRequired,

  /** Upload cancel handler */
  handleUploadCancel: PropTypes.func.isRequired,

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

  /** Upload tip text */
  tip: PropTypes.string.isRequired,

  /** Upload title */
  title: PropTypes.string.isRequired,
};

// EXPORT DEFAULT
export default UploadInputBlock;
