import React from 'react';
import { v4 as uuidv4 } from 'uuid';

// UI LIBS
import { Button, Input } from 'antd';
import { CopyOutlined, DownloadOutlined } from '@ant-design/icons';

// COMPONENTS
import { CommonTable } from 'components';
import InferenceTestResultModalError from './InferenceTestResultModalError';

// UTILS
import utils from 'utils';

const { TextArea } = Input;

/**
 * Component to render error placeholder or result information
 * based on status of experimentInference.
 * @returns {Component} Error placeholder, Table or a adaptable component
 */

const InferenceTestResultModalContent = (props) => {
  const { experimentInference, getDeployExperimentLogs, retryTest } = props;

  /**
   * Function to return either image, video or text
   *
   * @returns {Component} image, video or text based on data
   */
  const adaptableComponent = () => (
    <div className='container-difference'>
      {utils.isSupportedBinaryData(experimentInference) ? (
        utils.isImage(experimentInference) ? (
          <img
            src={utils.formatBase64(experimentInference)}
            alt='predict-response'
            className='image-difference'
            style={{ maxWidth: '100%' }}
          />
        ) : (
          <video src={experimentInference.binData} controls>
            <track default kind='captions' />
          </video>
        )
      ) : (
        <div className='iterative-prediction'>
          <h3>Resposta do Modelo</h3>
          <TextArea
            disabled={true}
            defaultValue={
              experimentInference.binData ?? experimentInference.strData
            }
          />
        </div>
      )}
    </div>
  );

  return (
    <>
      {!experimentInference ? (
        <InferenceTestResultModalError
          getDeployExperimentLogs={getDeployExperimentLogs}
          retryTest={retryTest}
        />
      ) : (
        <>
          {'ndarray' in experimentInference ? (
            <CommonTable
              columns={experimentInference.names.map((name) => ({
                title: name,
                dataIndex: name,
                key: name,
                width: 100,
              }))}
              dataSource={experimentInference.ndarray.map((e, i) => {
                const data = { key: i };
                experimentInference.names.forEach((c, j) => {
                  data[c] = e[j];
                });
                return data;
              })}
              isLoading={false}
              pagination={{
                defaultPageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '30', '40', '50'],
              }}
              rowKey={() => {
                return uuidv4();
              }}
              scroll={{ x: 800, y: 250 }}
            />
          ) : (
            adaptableComponent()
          )}
          <div className='predict-options-buttons'>
            <Button
              icon={<CopyOutlined />}
              type='primary'
              style={{ margin: '6px 6px 0px 0px' }}
              onClick={() => utils.copyToClipboard()}
            >
              Copiar
            </Button>
            <a
              href={utils.downloadFile(experimentInference)}
              download='predict-file'
            >
              <Button
                icon={<DownloadOutlined />}
                type='primary'
                style={{ margin: '6px 6px 0px 0px' }}
              >
                Fazer download
              </Button>
            </a>
          </div>
        </>
      )}
    </>
  );
};

export default InferenceTestResultModalContent;
