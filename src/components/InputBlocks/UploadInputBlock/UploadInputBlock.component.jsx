import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import { UploadOutlined } from '@ant-design/icons';
import { Dropdown, Empty, Menu, Upload, Typography, Button } from 'antd';

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
  deployment,
}) => {
  const [fileList, setFileList] = useState([]);

  const showDangerMessage = useMemo(() => {
    return experimentIsSucceeded && defaultFileList?.length > 0;
  }, [defaultFileList?.length, experimentIsSucceeded]);

  useEffect(() => {
    if (defaultFileList) {
      setFileList(defaultFileList);
    } else {
      setFileList([]);
    }
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

  const menuOverlay = useMemo(
    () =>
      datasets.length > 0 ? (
        datasets.map((dataset) => (
          <Menu.Item key={dataset.name}>{dataset.name}</Menu.Item>
        ))
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description='Não há conjuntos de dados.'
          style={{ paddingLeft: '10px', paddingRight: '10px' }}
        />
      ),
    [datasets]
  );

  return (
    <PropertyBlock tip={tip} title={title}>
      {deployment ? (
        <Upload {...uploadProps} disabled={isDisabled || datasetsLoading}>
          <Button>
            <UploadOutlined />
            {buttonText}
          </Button>
        </Upload>
      ) : (
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
                {menuOverlay}
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
      )}

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
  datasets: PropTypes.array,
  datasetsLoading: PropTypes.bool.isRequired,
  handleSelectDataset: PropTypes.func,
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

  /** Flag to check deployment */
  deployment: PropTypes.bool,
};

UploadInputBlock.defaultProps = {
  defaultFileList: undefined,
  handleSelectDataset: undefined,
  customRequest: undefined,
  deployment: false,
  datasets: [],
};

export default UploadInputBlock;
