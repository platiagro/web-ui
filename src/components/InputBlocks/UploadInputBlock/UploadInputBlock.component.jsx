import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import { UploadOutlined } from '@ant-design/icons';
import { Dropdown, Empty, Menu, Upload, Typography } from 'antd';

import { PropertyBlock } from 'components';

const { Text } = Typography;

const UploadInputBlock = ({
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
  experimentIsSucceeded,
}) => {
  const [fileList, setFileList] = useState([]);

  const showDangerMessage = useMemo(() => {
    return experimentIsSucceeded && defaultFileList?.length > 0;
  }, [defaultFileList?.length, experimentIsSucceeded]);

  useEffect(() => {
    if (defaultFileList) setFileList(defaultFileList);
  }, [defaultFileList]);

  const uploadProps = useMemo(() => {
    return {
      name: 'file',
      fileList: fileList,
      action: actionUrl,
      customRequest: customRequest,
      onChange(info) {
        if (info.file.status === 'removed') {
          handleUploadCancel();
          setFileList([]);
        }
      },
    };
  }, [actionUrl, customRequest, fileList, handleUploadCancel]);

  const setDataset = (e) => {
    // Stop opening the upload modal
    e.domEvent.stopPropagation();
    handleSelectDataset(e.key);
  };

  return (
    <PropertyBlock tip={tip} title={title}>
      <Upload {...uploadProps} disabled={isDisabled || datasetsLoading}>
        <Dropdown.Button
          trigger={['click']}
          overlay={
            <Menu
              className='datasets-menu'
              onClick={setDataset}
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
          }
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

      {showDangerMessage && (
        <Text>
          <br />
          Ao alterar o arquivo, algumas tarefas vão precisar ser reconfiguradas!
        </Text>
      )}
    </PropertyBlock>
  );
};

UploadInputBlock.propTypes = {
  actionUrl: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  datasets: PropTypes.array.isRequired,
  datasetsLoading: PropTypes.bool.isRequired,
  handleSelectDataset: PropTypes.func.isRequired,
  handleUploadCancel: PropTypes.func.isRequired,
  handleUploadFail: PropTypes.func.isRequired,
  handleUploadStart: PropTypes.func.isRequired,
  handleUploadSuccess: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  tip: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  defaultFileList: PropTypes.string,
  customRequest: PropTypes.func,
  experimentIsSucceeded: PropTypes.bool.isRequired,
};

UploadInputBlock.defaultProps = {
  defaultFileList: undefined,
  customRequest: undefined,
};

export default UploadInputBlock;
