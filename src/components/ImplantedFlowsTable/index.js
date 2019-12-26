/**
 * Component responsible for:
 * - Structuring the table layout
 * - List all implantations
 */
import './style.scss';
import React from 'react';
import { Icon, Table, Typography, Tooltip } from 'antd';

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
    title: 'Status',
    dataIndex: 'deployStatus',
    key: 'deployStatus',
    render: (value) => {
      let color;
      let type;
      if (value) {
        color = '#389E0D';
        type = 'check-circle';
      } else {
        color = '#FF0000';
        type = 'close-circle';
      }
      return (
        <Icon
          style={{
            fontSize: '20px',
            color,
            display: 'block',
            margin: 'auto',
          }}
          theme='filled'
          type={type}
        />
      );
    },
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
