import React from 'react';

import PropTypes from 'prop-types';

import { Table } from 'antd';

import './style.scss';

const tableColumns = [
  {
    title: 'Nome do Projeto',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Data de Criação',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 200,
    render: (value) => new Date(value).toLocaleString(),
  },
];

const ProjectsTable = ({ projectList, enterProjetc }) => {
  return (
    <Table
      className='projectsTable'
      rowKey={(record) => record.uuid}
      onRow={(record, rowIndex) => {
        return {
          onDoubleClick: (event) => {
            event.preventDefault();
            // eslint-disable-next-line
            enterProjetc(record, rowIndex);
          }, // double click row
        };
      }}
      dataSource={projectList}
      columns={tableColumns}
      pagination={{ pageSize: 9 }}
      scroll={{ y: 'calc(100vh - 480px)' }}
    />
  );
};

ProjectsTable.propTypes = {
  enterProjetc: PropTypes.func.isRequired,
  projectList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProjectsTable;
