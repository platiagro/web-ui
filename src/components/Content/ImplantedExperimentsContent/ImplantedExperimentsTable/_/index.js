// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

// UI LIBS
import { Badge, Button, Divider, Popconfirm, Tooltip, Typography } from 'antd';

// COMPONENTS
import { CommonTable } from 'components';
import UploadInferenceTestButton from '../UploadInferenceTestButton';

// STYLES
import './style.less';

// TYPOGRAPHY COMPONENTS
const { Paragraph } = Typography;

/**
 * Implanted Experiments Table.
 * This component is responsible for displaying implanted experiments table.
 *
 * @param {object} props Component props
 * @returns {ImplantedExperimentsTable} React Component
 */
const ImplantedExperimentsTable = (props) => {
  const {
    handleDeleteImplantedExperiment,
    handleOpenLog,
    handleTestInference,
    implantedExperiments,
    loading,
    selectedExperiment,
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
    <CommonTable
      dataSource={implantedExperiments}
      columns={columnsConfig}
      pagination={{ pageSize: 10 }}
      isLoading={loading}
      rowClassName={(record) => {
        return record.experimentId === selectedExperiment
          ? 'ant-table-row-selected'
          : '';
      }}
      rowKey={() => {
        return uuidv4();
      }}
    />
  );
};

// PROP TYPES
ImplantedExperimentsTable.propTypes = {
  /** delete implanted experiment handle */
  handleDeleteImplantedExperiment: PropTypes.func.isRequired,
  /** open log handle */
  handleOpenLog: PropTypes.func.isRequired,
  /** test inference handle */
  handleTestInference: PropTypes.func.isRequired,
  /** implanted experiments list */
  implantedExperiments: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** table is loading */
  loading: PropTypes.bool.isRequired,
  /** selected experiment */
  selectedExperiment: PropTypes.string.isRequired,
};

// EXPORT
export default ImplantedExperimentsTable;
