// REACT LIBS
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// UI LIB COMPONENTS
import { UploadOutlined } from '@ant-design/icons';
import { Dropdown, Empty, Menu, Upload } from 'antd';

// COMPONENTS
import { PropertyBlock } from 'components';

const UploadInputBlock = (props) => {
  // destructuring props
  const {
    actionUrl,
    customRequest,
    buttonText,
    datasets,
    datasetsLoading,
    handleSelectDataset,
    isDisabled,
    defaultFileList,
    handleUploadCancel,
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

  // upload props
  const uploadProps = {
    name: 'file',
    fileList: fileList,
    action: actionUrl,
    customRequest: customRequest,
    onChange(info) {
      if (info.file.status === 'removed') {
        // call upload cancel
        handleUploadCancel();
        // clear file list
        setFileList([]);
      }
    },
  };

  // set dataset handler
  const setDataset = (e) => {
    // stop opening the upload modal
    e.domEvent.stopPropagation();

    handleSelectDataset(e.key);
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
      {datasets.length > 0 ? (
        datasets.map((dataset) => (
          <Menu.Item key={dataset.name}>{dataset.name}</Menu.Item>
        ))
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description='Não há conjuntos de dados.'
          style={{ paddingLeft: '10px', paddingRight: '10px' }}
        />
      )}
    </Menu>
  );

  /* TODO: Liberar quando os tipos de arquivos aceitos forem limitados */
  // file extensions
  /*const fileExtensions = (
    <div style={{ marginTop: '10px' }}>Arquivos aceitos: .csv</div>
  );*/

  // rendering component
  return (
    <PropertyBlock tip={tip} title={title}>
      <Upload {...uploadProps} disabled={isDisabled || datasetsLoading}>
        <Dropdown.Button
          overlay={datasetsMenu}
          trigger={['click']}
          buttonsRender={([leftButton, rightButton]) => [
            <>{leftButton}</>,
            React.cloneElement(rightButton, {
              onClick: (e) => e.stopPropagation(),
              loading: datasetsLoading,
            }),
          ]}
        >
          <UploadOutlined />
          {buttonText}
        </Dropdown.Button>
      </Upload>
      {/* TODO: Liberar quando os tipos de arquivos aceitos forem limitados */}
      {/*fileList.length === 0 && fileExtensions*/}
    </PropertyBlock>
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

  /** Datasets list is loading */
  datasetsLoading: PropTypes.bool.isRequired,

  /** Dataset selected handler */
  handleSelectDataset: PropTypes.func.isRequired,

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

  /** Custom request function */
  customRequest: PropTypes.func,
};

// DEFAULT PROPS
UploadInputBlock.defaultProps = {
  /** Uploaded file name */
  defaultFileList: undefined,
  /** Custom request function */
  customRequest: undefined,
};

// EXPORT DEFAULT
export default UploadInputBlock;
