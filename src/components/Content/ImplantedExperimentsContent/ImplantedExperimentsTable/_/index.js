/* eslint-disable react/display-name */
// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

import { CommonTable } from 'components';

// UTILS
import utils from '../../../../../utils';

// UI LIBS
import {
  Table,
  Typography,
  Tooltip,
  Popconfirm,
  Badge,
  Divider,
  Modal,
  Button,
  Input,
  notification,
} from 'antd';

import { CopyOutlined, DownloadOutlined } from '@ant-design/icons';

// COMPONENTS
import UploadInferenceTestButton from '../UploadInferenceTestButton';
import LogsDrawer from '../../LogsDrawer/Container';

// STYLES
import './style.less';

// TYPOGRAPHY COMPONENTS
const { Paragraph } = Typography;
const { TextArea } = Input;

/**
 * Implanted Experiments Table.
 * This component is responsible for displaying implanted experiments table.
 *
 * @param {object} props Component props
 * @returns {ImplantedExperimentsTable} React Component
 * @component
 */
const ImplantedExperimentsTable = (props) => {
  // destructuring props
  const {
    implantedExperiments,
    handleTestInference,
    handleOpenLog,
    handleDeleteImplantedExperiment,
    loading,
    selectedExperiment,
    experimentInference,
    experimentInferenceModal,
    closeModal,
  } = props;

  // convert status to badge icon
  const statusToBadge = {
    Failed: 'error',
    Running: 'processing',
    Succeeded: 'success',
  };

  // table columns config
  const columnsConfig = [
    // status column
    {
      title: <strong>Status</strong>,
      dataIndex: 'status',
      key: 'status',
      render: (value) => (
        // badge
        <Badge status={statusToBadge[value]} text={value} />
      ),
    },
    // name
    {
      title: <strong>Nome</strong>,
      dataIndex: 'name',
      key: 'name',
    },
    // url column
    {
      title: <strong>URL</strong>,
      dataIndex: 'url',
      key: 'url',
      render: (value) => (
        // tooltip
        <Tooltip title={value}>
          {/* copyable paragraph */}
          <Paragraph copyable>{value}</Paragraph>
        </Tooltip>
      ),
    },
    // createdAt column
    {
      title: <strong>Data de Criação</strong>,
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value) => new Date(value).toLocaleString(),
    },
    // action column
    {
      title: <strong>Ação</strong>,
      dataIndex: 'action',
      key: 'action',
      render: (value, record) => (
        // fragment container
        <>
          {/* see error logs */}
          <Popconfirm
            placement='left'
            title='Você tem certeza que deseja excluir essa implantação?'
            okText='Sim'
            cancelText='Não'
            onConfirm={() =>
              handleDeleteImplantedExperiment(record.experimentId)
            }
          >
            <Button type='link'>Deletar</Button>
          </Popconfirm>
          <Divider type='vertical' />
          <Button
            type='link'
            onClick={() => handleOpenLog(record.experimentId)}
          >
            Logs
          </Button>
          <Divider type='vertical' />
          {/* upload inference test button */}
          <UploadInferenceTestButton
            handleUpload={(file) =>
              handleTestInference(record.experimentId, file)
            }
          />
        </>
      ),
    },
  ];

  // RENDER
  return (
    // rendering implanted experiments table
    <>
      <CommonTable
        dataSource={implantedExperiments}
        columns={columnsConfig}
        pagination={{ pageSize: 10 }}
        isLoading={loading}
        rowKey={'runId'}
        rowClassName={(record) =>
          record.name === selectedExperiment ? 'ant-table-row-selected' : ''
        }
      />
      <LogsDrawer />
      <Modal
        title={<strong>Visualizar resultados</strong>}
        visible={experimentInferenceModal}
        onOk={closeModal}
        onCancel={closeModal}
        width='70vw'
      >
        {'ndarray' in experimentInference ? (
          <Table
            dataSource={experimentInference.ndarray.map((e, i) => {
              const data = { key: i };
              experimentInference.names.forEach((c, j) => {
                data[c] = e[j];
              });
              return data;
            })}
            columns={experimentInference.names.map((name) => ({
              title: name,
              dataIndex: name,
              key: name,
              width: 100,
            }))}
            scroll={{ x: 800 }}
          />
        ) : (
          <div className='container-difference'>
            {utils.isSupportedBinaryData(experimentInference) ? (
              utils.isImage(experimentInference) ? (
                <img
                  src={Object.values(experimentInference).shift()}
                  alt='predict-response'
                  className='image-difference'
                />
              ) : (
                <video
                  src={Object.values(experimentInference).shift()}
                  controls
                >
                  <track default kind='captions' />
                </video>
              )
            ) : (
              <div className='iterative-prediction'>
                <h3>Resposta do Modelo</h3>
                <TextArea
                  disabled={true}
                  defaultValue={Object.values(experimentInference).shift()}
                />
                <Button
                  icon={<CopyOutlined />}
                  type='primary'
                  style={{ margin: '6px 6px 0px 0px' }}
                  onClick={() => {
                    navigator.clipboard
                      .writeText(Object.values(experimentInference).shift())
                      .then(() =>
                        notification['success']({
                          message: 'Texto Copiado',
                          description:
                            'O resultado do modelo foi copiado para sua área de transferência!',
                        })
                      );
                  }}
                >
                  Copiar
                </Button>
                <a
                  href={Object.values(experimentInference).shift()}
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
            )}
          </div>
        )}
      </Modal>
    </>
  );
};

// PROP TYPES
ImplantedExperimentsTable.propTypes = {
  /** implanted experiments table implanted experiments list */
  implantedExperiments: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** implanted experiments table test inference handle */
  handleTestInference: PropTypes.func.isRequired,
};

// EXPORT
export default ImplantedExperimentsTable;
