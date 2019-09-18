import React from 'react';

import PropTypes from 'prop-types';

import { Table, Tooltip } from 'antd';

import './style.scss';

const tableColumns = [
  {
    title: 'Nome do Projeto',
    dataIndex: 'projectName',
    key: 'projectName',
  },
  {
    title: 'Experimentos',
    dataIndex: 'experiments',
    key: 'experiments',
  },
  {
    title: 'Data de Criação',
    dataIndex: 'created',
    key: 'created',
  },
];

const ProjectsTable = ({ projectList, rowSelection }) => {
  projectList.forEach((project) => {
    const projectAux = project;
    projectAux.experiments = (
      <Tooltip title={project.experimentsList.join(', ')}>
        <span>{project.experimentsList.join(', ')}</span>
      </Tooltip>
    );
  });

  return (
    <Table
      onRow={(record, rowIndex) => {
        return {
          onDoubleClick: (event) => {
            event.preventDefault();
            // eslint-disable-next-line
            console.log(record, rowIndex);
          }, // double click row
        };
      }}
      rowSelection={rowSelection}
      dataSource={projectList}
      columns={tableColumns}
      pagination={{ pageSize: 9 }}
    />
  );
};

ProjectsTable.propTypes = {
  projectList: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowSelection: PropTypes.shape({
    selectedRowKeys: PropTypes.array,
    onChange: PropTypes.func,
  }).isRequired,
};

export default ProjectsTable;
