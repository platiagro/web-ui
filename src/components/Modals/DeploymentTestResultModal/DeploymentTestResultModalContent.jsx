import React, { useMemo } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { CopyOutlined, DownloadOutlined } from '@ant-design/icons';

import utils from 'utils';
import { CommonTable } from 'components';

import DeploymentTestResultModalData from './DeploymentTestResultModalData';
import InferenceTestResultModalError from './DeploymentTestResultModalError';

const DeploymentTestResultModalContent = ({
  testResult,
  handleShowLogs,
  handleTryAgain,
}) => {
  const dataSource = useMemo(() => {
    if (!testResult) return [];

    return testResult.ndarray.map((e, i) => {
      const data = { key: i };

      testResult.names.forEach((c, j) => {
        data[c] = e[j];
      });

      return data;
    });
  }, [testResult]);

  const columns = useMemo(() => {
    if (!testResult) return [];

    return testResult.names.map((name) => ({
      title: name,
      dataIndex: name,
      key: name,
      width: 100,
    }));
  }, [testResult]);

  if (!testResult) {
    return (
      <InferenceTestResultModalError
        handleShowLogs={handleShowLogs}
        handleTryAgain={handleTryAgain}
      />
    );
  }

  return (
    <>
      {'ndarray' in testResult ? (
        <CommonTable
          isLoading={false}
          columns={columns}
          dataSource={dataSource}
          rowKey={({ key }) => key}
          scroll={{ x: 800, y: 250 }}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30', '40', '50'],
          }}
        />
      ) : (
        <div className='container-difference'>
          <DeploymentTestResultModalData testResult={testResult} />
        </div>
      )}

      <div className='predict-options-buttons'>
        <Button
          type='primary'
          icon={<CopyOutlined />}
          style={{ margin: '6px 6px 0px 0px' }}
          onClick={() => utils.copyToClipboard(testResult)}
        >
          Copiar
        </Button>

        <a href={utils.downloadFile(testResult)} download='predict-file'>
          <Button
            type='primary'
            icon={<DownloadOutlined />}
            style={{ margin: '6px 6px 0px 0px' }}
          >
            Fazer Download
          </Button>
        </a>
      </div>
    </>
  );
};

DeploymentTestResultModalContent.propTypes = {
  testResult: PropTypes.any,
  handleShowLogs: PropTypes.func.isRequired,
  handleTryAgain: PropTypes.func.isRequired,
};

export default DeploymentTestResultModalContent;