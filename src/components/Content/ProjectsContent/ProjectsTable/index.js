// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Table, Button, Popconfirm } from 'antd';

// COMPONENTS
import ProjectsEmpty from '../ProjectsEmpty';

/**
 * Projects Table.
 * This component is responsible for displaying projects table.
 */
const ProjectsTable = ({ projects, handleClickProject, handleClickDelete }) => {
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
    {
      title: 'Ação',
      dataIndex: 'action',
      key: 'action',
      width: 200,
      render: (value, record) => (
        <Popconfirm
          title='Você tem certeza que deseja excluir essa tarefa?'
          onConfirm={() => handleClickDelete(record.uuid)}
          okText='Sim'
          cancelText='Não'
        >
          <Button type='link'>Excluir</Button>
        </Popconfirm>
      ),
    },
  ];

  // RENDER
  return projects && projects.length > 0 ? (
    // table
    <Table
      className='projectsTable'
      rowKey={(record) => record.uuid}
      dataSource={projects}
      columns={columnsConfig}
      pagination={{ pageSize: 9 }}
      scroll={{ y: 'calc(100vh - 480px)' }}
    />
  ) : (
    // projects empty
    <ProjectsEmpty />
  );
};

// PROP TYPES
ProjectsTable.propTypes = {
  /** projects list */
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** projects table click project handle */
  handleClickProject: PropTypes.func.isRequired,
  /** projects table delete project handle */
  handleClickDelete: PropTypes.func.isRequired,
};

// EXPORT
export default ProjectsTable;
