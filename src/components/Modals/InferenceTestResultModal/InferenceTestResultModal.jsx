// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

// UI LIBS
import { Button, Input, Modal, notification, Result } from 'antd';
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
  /**
   * Transform a tabular data or a binary data to a plain text.
   *
   * @param {object} strEncoded Seldon object response
   * @returns {string} a string with Seldon response
   */
  const toRawText = (strEncoded) => {
    const { binData, names, ndarray, strData } = strEncoded;
    if (names && ndarray) {
      const columns = names.join(',');
      return columns + '\n' + ndarray.join('\n');
    } else if (binData) {
      return binData;
    } else {
      return strData;
    }
  };

  /**
   * Copy Seldon response to clipboard.
   */
  const copyToClipboard = () => {
    const text = toRawText(experimentInference);
    navigator.clipboard
      .writeText(text)
      .then(() =>
        notification['success']({
          message: 'Texto Copiado',
          description:
            'O resultado do modelo foi copiado para sua área de transferência!',
        })
      )
      .catch(() =>
        notification['error']({
          message: 'Erro ao Copiar Texto',
          description: 'Pode ser que o retorno do modelo esteja corrompido.',
        })
      );
  };

  /**
   * Download a response content as file
   *
   * @returns {string} content as base64
   */
  const downloadFile = () => {
    return utils.isSupportedBinaryData(experimentInference)
      ? experimentInference.strData
      : `data:text/plain;base64,${btoa(toRawText(experimentInference))}`;
  };

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
                        src={experimentInference.strData}
                        alt='predict-response'
                        className='image-difference'
                        style={{ maxWidth: '100%' }}
                      />
                    ) : (
                      <video src={experimentInference.strData} controls>
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
                  onClick={() => copyToClipboard()}
                >
                  Copiar
                </Button>
                <a href={downloadFile()} download='predict-file'>
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
