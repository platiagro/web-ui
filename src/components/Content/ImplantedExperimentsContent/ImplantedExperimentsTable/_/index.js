// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Table, Typography, Tooltip } from 'antd';

// COMPONENTS
import UploadInferenceTestButton from '../UploadInferenceTestButton';
import ImplantedExperimentsEmpty from '../../ImplantedExperimentsEmpty';

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
}) => {
  // table columns config
  const columnsConfig = [
    // name column
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
    // created column
    {
      title: 'Data de Criação',
      dataIndex: 'created',
      key: 'created',
    },
    // action column
    {
      title: 'Ação',
      dataIndex: 'action',
      key: 'action',
      render: (value, record) => (
        // fragment container
        <>
          {/* monitoring link */}
          <a target='_blank' href='/notebook/kubeflow-anonymous/server-1/tree?'>
            Monitoramento
          </a>
          {/* upload inference test button */}
          <UploadInferenceTestButton
            handleUpload={(file) => handleTestInference(record.uuid, file)}
          />
        </>
      ),
    },
  ];

  // RENDER
  return (
    // rendering implanted experiments table or implanted experiments empty
    implantedExperiments.length > 0 ? (
      <Table
        dataSource={implantedExperiments}
        columns={columnsConfig}
        pagination={{ pageSize: 9 }}
      />
    ) : (
      <ImplantedExperimentsEmpty />
    )
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
