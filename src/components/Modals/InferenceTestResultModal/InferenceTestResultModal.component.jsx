// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

// UI LIBS
import { Button, Input, Modal, Result } from 'antd';
import { CopyOutlined, DownloadOutlined } from '@ant-design/icons';

// COMPONENTS
import { CommonTable } from 'components';
import { Skeleton } from 'uiComponents';

// UTILS
import utils from 'utils';

const { TextArea } = Input;

const InferenceTestResultModal = ({
  closeModal,
  experimentInference,
  getDeployExperimentLogs,
  isLoading,
  retryTest,
  visible,
}) => {
  return (
    <Modal
      title={<strong>Visualizar resultados</strong>}
      visible={visible}
      onOk={closeModal}
      onCancel={closeModal}
      cancelButtonProps={{ style: { display: 'none' }, disabled: true }}
      width='70vw'
    >
      {isLoading ? (
        <Skeleton paragraphConfig={{ rows: 10, width: '100%' }} />
      ) : (
        <>
          {!experimentInference ? (
            <Result
              status='error'
              title='Ocorreu um erro'
              subTitle='O fluxo implantado retornou um erro durante os testes. Acesse os logs para ver mais detalhes sobre o erro e tomar uma ação.'
              extra={[
                <Button
                  type='primary'
                  key='logs'
                  onClick={getDeployExperimentLogs}
                >
                  Acessar Logs
                </Button>,
                <Button key='retry' onClick={retryTest}>
                  Testar novamente
                </Button>,
              ]}
            ></Result>
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
                          experimentInference.binData
                            ? experimentInference.binData
                            : experimentInference.strData
                        }
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
      )}
    </Modal>
  );
};

// PROP TYPES
InferenceTestResultModal.propTypes = {
  /** close modal handler */
  closeModal: PropTypes.func.isRequired,
  /** experiment inference results*/
  experimentInference: PropTypes.object,
  /** get deploy experiment logs handler */
  getDeployExperimentLogs: PropTypes.func.isRequired,
  /** results is loading */
  isLoading: PropTypes.bool.isRequired,
  /** retry test handler */
  retryTest: PropTypes.func.isRequired,
  /** modal is visible */
  visible: PropTypes.bool.isRequired,
};

// EXPORT
export default InferenceTestResultModal;
