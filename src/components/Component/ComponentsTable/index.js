/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Popconfirm, Table } from 'antd';

import './style.scss';

// eslint-disable-next-line
class ComponentTable extends React.Component {
  render() {
    const { componentList, onDelete } = this.props;

    const tableColumns = [
      {
        title: 'Nome do Componente',
        dataIndex: 'name',
        key: 'name',
        render: (value, record) => (
          <Link to={`components/${record.uuid}`}>{value}</Link>
        ),
        sorter: (a, b) => a.name.localeCompare(b.name),
        ellipsis: true,
      },
      {
        title: 'Data de Criação',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 200,
        render: (value) => new Date(value).toLocaleString(),
        sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        ellipsis: true,
      },
      {
        title: '',
        key: 'action',
        width: 100,
        render: (record) => (
          <Popconfirm
            value={record}
            title={`Tem certeza de que deseja excluir o componente ${record.name} ?`}
            onConfirm={() => {
              onDelete(record);
            }}
            okText='Sim'
            cancelText='Não'
            placement='left'
          >
            <a href='#'>Remover</a>
          </Popconfirm>
        ),
      },
    ];

    return (
      <Table
        className='componentsTable'
        rowKey={(record) => record.uuid}
        dataSource={componentList}
        columns={tableColumns}
        pagination={{ pageSize: 9 }}
        scroll={{ y: 'calc(100vh - 480px)' }}
      />
    );
  }
}

ComponentTable.propTypes = {
  componentList: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ComponentTable;
