/* eslint-disable jsx-a11y/anchor-is-valid */
import './style.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { Popconfirm, Table, Tag } from 'antd';

const ParametersTable = (props) => {
  const { parameterList, onDelete } = props;

  const tableColumns = [
    {
      title: 'Parâmetro',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      ellipsis: true,
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
        return (
          <Tag
            color={color}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            {value}
          </Tag>
        );
      },
    },
    {
      title: 'Detalhes',
      dataIndex: 'details',
      key: 'details',
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
          <a href='#'>Remover</a>
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
};

ParametersTable.propTypes = {
  parameterList: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ParametersTable;
