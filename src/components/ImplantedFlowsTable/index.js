import React from 'react';

import { Table, Typography, Tooltip } from 'antd';
import { Link } from 'react-router-dom';

import './style.scss';

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
    // render: (value) => new Date(value).toLocaleString(),
  },
  {
    title: 'Ação',
    dataIndex: 'action',
    key: 'action',
    render: (value) => (
      <Link to='/notebook/kubeflow-anonymous/server-1/tree?'>
        Monitoramento
      </Link>
    ),
  },
];

const ImplantedFlowsTable = ({ flowList }) => {
  return (
    <Table
      // rowKey={(record) => record.uuid}
      dataSource={flowList}
      columns={tableColumns}
      pagination={{ pageSize: 9 }}
      // scroll={{ y: 'calc(100vh - 480px)' }}
    />
  );
};

export default ImplantedFlowsTable;
