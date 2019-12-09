/**
 * Component responsible for:
 * - List the component parameters
 * - Remove component parameter
 */
import './style.scss';
import React from 'react';
import { connect } from 'react-redux';
import { Popconfirm, message, Table, Tag } from 'antd';
import { removeParam } from '../../../store/actions/componentActions';

const ParametersTable = (props) => {
  const { details, onRemoveParam } = props;
  const { uuid, parameters } = details;

  /**
   * Function to handle parameter delete
   * @param {Object} removedParameter
   */
  const handleDelete = (removedParameter) => {
    onRemoveParam(uuid, parameters, removedParameter).then((response) => {
      if (response) {
        message.success(
          `Parâmetro ${removedParameter.name} removido com sucesso`
        );
      }
    });
  };

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
            handleDelete(record);
          }}
          okText='Sim'
          cancelText='Não'
          placement='left'
        >
          {/* eslint-disable jsx-a11y/anchor-is-valid */}
          <a href='#'>Remover</a>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Table
      className='parametersTable'
      rowKey={(record) => record.name}
      dataSource={parameters}
      columns={tableColumns}
      pagination={{ pageSize: 9 }}
      scroll={{ y: 'calc(100vh - 480px)' }}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    details: state.component.details,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRemoveParam: (id, parameters, removedParameter) => {
      return dispatch(removeParam(id, parameters, removedParameter));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParametersTable);
