/**
 * Component responsible for:
 * - Structuring the table layout
 * - List all implantations
 */
import './style.scss';
import React from 'react';
import { Table, Typography, Tooltip } from 'antd';

const { Paragraph } = Typography;

const tableColumns = [
  {
    title: 'Nome',
    dataIndex: 'flowName',
    key: 'flowName',
  },
  {
    title: 'URL',
    dataIndex: 'url',
    key: 'url',
    render: (value) => (
      <Tooltip title={value}>
        <Paragraph ellipsis copyable>
          {value}
        </Paragraph>
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
    render: (value) => (
      <a target='_blank' href='/notebook/kubeflow-anonymous/server-1/tree?'>
        Monitoramento
      </a>
    ),
  },
];

const ImplantedFlowsTable = ({ flowList }) => {
  return (
    <Table
      dataSource={flowList}
      columns={tableColumns}
      pagination={{ pageSize: 9 }}
    />
  );
};

export default ImplantedFlowsTable;
