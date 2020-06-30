// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Table, Button, Popconfirm } from 'antd';

/**
 * Projects Table.
 * This component is responsible for displaying projects table.
 */
const ProjectsTable = ({
  projects,
  loading,
  handleClickProject,
  handleClickDelete,
  handleShowNewProjectModal,
}) => {
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
      title: 'Descrição',
      dataIndex: 'description',
      key: 'description',
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
      width: 300,
      render: (value, record) => (
        <>
          <Button type='link' onClick={() => handleShowNewProjectModal(record)}>
            Alterar nome e descrição
          </Button>

          <Popconfirm
            title='Você tem certeza que deseja excluir esse projeto?'
            onConfirm={() => handleClickDelete(record.uuid)}
            okText='Sim'
            cancelText='Não'
          >
            <Button type='link'>Excluir</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  // RENDER
  return (
    <Table
      className='projectsTable'
      rowKey={(record) => record.uuid}
      dataSource={projects}
      columns={columnsConfig}
      pagination={false}
      loading={loading}
    />
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
  /** is loading */
  loading: PropTypes.bool.isRequired,
};

// EXPORT
export default ProjectsTable;
