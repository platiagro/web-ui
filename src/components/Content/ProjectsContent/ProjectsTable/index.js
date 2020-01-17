/**
 * Component responsible for:
 * - Structuring the table layout
 * - List all available projects
 * - Routing to project detail page on item click
 */
import React from 'react';
import './style.scss';

import { Link } from 'react-router-dom';
import { Table } from 'antd';
import { connect } from 'react-redux';

const ProjectsTable = (props) => {
  const { projectsList } = props;
  const tableColumns = [
    {
      title: 'Nome do Projeto',
      dataIndex: 'name',
      key: 'name',
      render: (value, record) => (
        <Link to={`projects/${record.uuid}`}>{value}</Link>
      ),
    },
    {
      title: 'Data de Criação',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 200,
      render: (value) => new Date(value).toLocaleString(),
    },
  ];

  return (
    <Table
      className='projectsTable'
      rowKey={(record) => record.uuid}
      dataSource={projectsList}
      columns={tableColumns}
      pagination={{ pageSize: 9 }}
      scroll={{ y: 'calc(100vh - 480px)' }}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    projectsList: state.projects.projectsList,
  };
};

export default connect(mapStateToProps)(ProjectsTable);
