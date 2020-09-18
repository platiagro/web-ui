// REACT LIBS
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// UI LIB COMPONENTS
import { UploadOutlined } from '@ant-design/icons';
import { Upload, Dropdown, Menu } from 'antd';

// COMPONENTS
import { InputBlockContainer } from 'components';

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
    datasets,
    handleFetchDataset,
    handleUploadCancel,
    handleUploadFail,
    handleUploadStart,
    handleUploadSuccess,
    isDisabled,
    isLoading,
    defaultFileList,
    tip,
    title,
  } = props;

  //
  const [fileList, setFileList] = useState([]);

  // file list state hook
  // Similar ao componentDidMount e componentDidUpdate:
  useEffect(() => {
    defaultFileList && setFileList(defaultFileList);
  }, [defaultFileList]);

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

  const setDataset = (e) => {
    // stop opening the upload modal
    e.domEvent.stopPropagation();

    handleFetchDataset(e.key);
  };

  const datasetsMenu = (
    <Menu
      onClick={setDataset}
      classname='datasets-menu'
      style={{
        maxHeight: '400px',
        overflow: 'auto',
      }}
    >
      {datasets.map((dataset) => (
        <Menu.Item key={dataset.name}>{dataset.name}</Menu.Item>
      ))}
    </Menu>
  );

  /* TODO: Liberar quando os tipos de arquivos aceitos forem limitados */
  // file extensions
  /*const fileExtensions = (
    <div style={{ marginTop: '10px' }}>Arquivos aceitos: .csv</div>
  );*/

  // rendering component
  return (
    <InputBlockContainer tip={tip} title={title}>
      <Upload {...uploadProps} disabled={isDisabled || isLoading}>
        <Dropdown.Button
          overlay={datasetsMenu}
          trigger={['click']}
          buttonsRender={([leftButton, rightButton]) => [
            <>{leftButton}</>,
            React.cloneElement(rightButton, {
              onClick: (e) => e.stopPropagation(),
            }),
          ]}
        >
          <UploadOutlined />
          {buttonText}
        </Dropdown.Button>
      </Upload>
      {/* TODO: Liberar quando os tipos de arquivos aceitos forem limitados */}
      {/*fileList.length === 0 && fileExtensions*/}
    </InputBlockContainer>
  );
};

// PROP TYPES
UploadInputBlock.propTypes = {
  /** Upload action url */
  actionUrl: PropTypes.string.isRequired,

  /** Upload button text */
  buttonText: PropTypes.string.isRequired,

  /** List of all datasets */
  datasets: PropTypes.array.isRequired,

  /** Fetch dataset by name handler */
  handleFetchDataset: PropTypes.func.isRequired,

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

  /** Uploaded file name */
  defaultFileList: PropTypes.string,
};

// DEFAULT PROPS
UploadInputBlock.defaultProps = {
  /** Uploaded file name */
  defaultFileList: undefined,
};

// EXPORT DEFAULT
export default UploadInputBlock;
