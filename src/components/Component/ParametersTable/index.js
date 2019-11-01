/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import PropTypes from 'prop-types';
import { Popconfirm, Table, Tag } from 'antd';

import './style.scss';

// eslint-disable-next-line
class ParametersTable extends React.Component {
  render() {
    const { parameterList, onDelete } = this.props;

    const tableColumns = [
      {
        title: 'Parâmetro',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Tipo',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'Valor padrão',
        dataIndex: 'default',
        key: 'default',
      },
      {
        title: 'Obrigatório',
        dataIndex: 'required',
        key: 'requireda',
        render: (required) => {
          let value;
          let color;
          if (required) {
            value = 'Sim';
            color = 'green';
          } else {
            value = 'Não';
            color = 'volcano';
          }
          return <Tag color={color}>{value}</Tag>;
        },
      },
      {
        title: 'Detalhes',
        dataIndex: 'detail',
        key: 'detail',
      },
      {
        title: '',
        key: 'action',
        width: 100,
        render: (record) => (
          <Popconfirm
            value={record}
            title={`Tem certeza de que deseja excluir o parâmetro ${record.name} ?`}
            onConfirm={() => {
              onDelete(record);
            }}
            okText='Sim'
            cancelText='Não'
            placement='left'
          >
            <a href='#'>Delete</a>
          </Popconfirm>
        ),
      },
    ];

    return (
      <Table
        className='parametersTable'
        rowKey={(record) => record.name}
        dataSource={parameterList}
        columns={tableColumns}
        pagination={{ pageSize: 9 }}
        scroll={{ y: 'calc(100vh - 480px)' }}
      />
    );
  }
}

ParametersTable.propTypes = {
  parameterList: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ParametersTable;
