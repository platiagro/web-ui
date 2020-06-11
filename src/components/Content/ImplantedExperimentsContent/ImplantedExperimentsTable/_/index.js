// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import {
  Table,
  Typography,
  Tooltip,
  Popconfirm,
  Badge,
  Divider,
  Modal,
} from 'antd';

// COMPONENTS
import UploadInferenceTestButton from '../UploadInferenceTestButton';
import LogsDrawer from '../../LogsDrawer/Container';

// STYLES
import './style.scss';

// TYPOGRAPHY COMPONENTS
const { Paragraph } = Typography;

/**
 * Implanted Experiments Table.
 * This component is responsible for displaying implanted experiments table.
 */
const ImplantedExperimentsTable = ({
  implantedExperiments,
  handleTestInference,
  handleOpenLog,
  handleDeleteImplantedExperiment,
  loading,
  selectedExperiment,
  experimentInference,
  experimentInferenceModal,
  closeModal,
}) => {
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (value) => (
        // badge
        <Badge status={statusToBadge[value]} text={value} />
      ),
    },
    // name
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    // url column
    {
      title: 'URL',
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
      title: 'Data de Criação',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value) => new Date(value).toLocaleString(),
    },
    // action column
    {
      title: 'Ação',
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
            <a>Deletar</a>
          </Popconfirm>
          <Divider type='vertical' />
          <a onClick={() => handleOpenLog(record.experimentId)}>Logs</a>
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
      <Table
        dataSource={implantedExperiments}
        columns={columnsConfig}
        pagination={{ pageSize: 9 }}
        loading={loading}
        rowClassName={(record) =>
          record.name === selectedExperiment ? 'ant-table-row-selected' : ''
        }
      />
      <LogsDrawer />
      <Modal
        title='Predições'
        visible={experimentInferenceModal}
        onOk={closeModal}
        onCancel={closeModal}
      >
        <Table
          dataSource={experimentInference.ndarray.map((e, i) => {
            const data = { key: i };
            experimentInference.names.map((c, j) => {
              data[c] = e[j];
            });
            return data;
          })}
          columns={experimentInference.names.map((name) => ({
            title: name,
            dataIndex: name,
            key: name,
          }))}
          scroll={{ x: 800 }}
        />
        ;
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
