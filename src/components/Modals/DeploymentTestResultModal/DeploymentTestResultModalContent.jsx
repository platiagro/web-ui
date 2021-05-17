import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'antd';
import { CopyOutlined, DownloadOutlined } from '@ant-design/icons';

import utils from 'utils';
import { CommonTable } from 'components';

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
          scroll={{ x: 800, y: 250 }}
          rowKey={() => `${Math.random()}`}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30', '40', '50'],
          }}
        />
      ) : (
        <div className='container-difference'>
          {utils.isSupportedBinaryData(testResult) ? (
            <>
              {utils.isImage(testResult) ? (
                <img
                  src={utils.formatBase64(testResult)}
                  alt='predict-response'
                  className='image-difference'
                  style={{ maxWidth: '100%' }}
                />
              ) : (
                <video src={testResult.binData} controls>
                  <track default kind='captions' />
                </video>
              )}
            </>
          ) : (
            <div className='iterative-prediction'>
              <h3>Resposta do Modelo</h3>

              <Input.TextArea
                disabled={true}
                defaultValue={testResult.binData ?? testResult.strData}
              />
            </div>
          )}
        </div>
      )}

      <div className='predict-options-buttons'>
        <Button
          icon={<CopyOutlined />}
          type='primary'
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
