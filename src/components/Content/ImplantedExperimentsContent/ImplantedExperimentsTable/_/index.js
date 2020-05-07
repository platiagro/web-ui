// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Table, Typography, Tooltip, Button, Badge } from 'antd';

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
  loading,
}) => {
  // CONSTANTS

  // convert status to badge icon
  const statusToBadge = {
    Failed: 'error',
    Running: 'processing',
    Succeded: 'success',
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
          <Button type='link' onClick={() => handleOpenLog(record)}>
            Logs
          </Button>
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
      />
      <LogsDrawer />
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
