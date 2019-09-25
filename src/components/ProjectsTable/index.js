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
    title: 'Data de Criação',
    dataIndex: 'created',
    key: 'created',
    width: 200,
  },
];

const ProjectsTable = ({ projectList, rowSelection, enterProjetc }) => {
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
            enterProjetc(record, rowIndex);
          }, // double click row
        };
      }}
      rowSelection={rowSelection}
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
  rowSelection: PropTypes.shape({
    selectedRowKeys: PropTypes.array,
    onChange: PropTypes.func,
  }).isRequired,
};

export default ProjectsTable;
