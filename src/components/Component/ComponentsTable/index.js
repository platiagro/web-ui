/**
 * Component responsible for:
 * - List all available components
 * - Routing to component detail page on item click
 * - Delete selected component
 */
import './style.scss';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Popconfirm, Table } from 'antd';
import { deleteComponent } from '../../../store/actions/componentsActions';

const ComponentsTable = (props) => {
  const { componentList, onDeleteComponent } = props;
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
            onDeleteComponent(record.uuid);
          }}
          okText='Sim'
          cancelText='Não'
          placement='left'
        >
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
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
};

const mapStateToProps = (state) => {
  return {
    componentList: state.components.componentList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteComponent: (id) => {
      dispatch(deleteComponent(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComponentsTable);
