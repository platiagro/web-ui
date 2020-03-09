// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Table, Typography, Tooltip } from 'antd';

// COMPONENTS
import UploadInferenceTestButton from '../UploadInferenceTestButton';

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
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      render: (value) => (
        <Tooltip title={value}>
          <Paragraph copyable>{value}</Paragraph>
        </Tooltip>
      ),
    },
    {
      title: 'Data de Criação',
      dataIndex: 'created',
      key: 'created',
    },
    {
      title: 'Ação',
      dataIndex: 'action',
      key: 'action',
      render: (value, record) => (
        <>
          <a target='_blank' href='/notebook/kubeflow-anonymous/server-1/tree?'>
            Monitoramento
          </a>
          &nbsp; &nbsp; &nbsp;
          <UploadInferenceTestButton
            handleUpload={(file) => handleTestInference(record.uuid, file)}
          />
        </>
      ),
    },
  ];

  // RENDER
  return (
    <Table
      dataSource={implantedExperiments}
      columns={columnsConfig}
      pagination={{ pageSize: 9 }}
    />
  );
};

export default ImplantedExperimentsTable;
