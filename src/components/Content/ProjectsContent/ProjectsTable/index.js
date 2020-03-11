// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Table, Button } from 'antd';

// COMPONENTS
import ProjectsEmpty from '../ProjectsEmpty';

/**
 * Projects Table.
 * This component is responsible for displaying projects table.
 */
const ProjectsTable = ({ projects, handleClickProject }) => {
  // table columns config
  const columnsConfig = [
    {
      title: 'Nome do Projeto',
      dataIndex: 'name',
      key: 'name',
      render: (value, record) => (
        <Button type='link' onClick={() => handleClickProject(record.uuid)}>
          {value}
        </Button>
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

  // RENDER
  return projects && projects.length > 0 ? (
    <Table
      className='projectsTable'
      rowKey={(record) => record.uuid}
      dataSource={projects}
      columns={columnsConfig}
      pagination={{ pageSize: 9 }}
      scroll={{ y: 'calc(100vh - 480px)' }}
    />
  ) : (
    <ProjectsEmpty />
  );
};

// PROP TYPES
ProjectsTable.propTypes = {
  /** projects list */
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** projects table click project handle */
  handleClickProject: PropTypes.func.isRequired,
};

// EXPORT
export default ProjectsTable;
