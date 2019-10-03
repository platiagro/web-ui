import React from 'react';

import { Table } from 'antd';

import './style.scss';

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
    render: (value) => <a href={value}>Monitoramento</a>,
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
