// CORE LIBS
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Button, Icon, Input, Popconfirm, Table } from 'antd';

/**
 * Projects Table.
 * This component is responsible for displaying projects table.
 */
const ProjectsTable = ({
  loading,
  projects,
  handleClickProject,
  handleClickDelete,
  handleFetchPaginatedProjects,
  handleShowNewProjectModal,
  handleSelectedProjects,
}) => {
  const [searchText, setSearchText] = useState('');
  const previousSearchText = useRef(null);
  const intervalRef = useRef(null);
  const confirmRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchText) {
      intervalRef.current = setTimeout(() => {
        console.log(searchText);
        previousSearchText.current = searchText;
        confirmRef.current();
        handleFetchPaginatedProjects(searchText);
      }, 1000);
    } else {
      console.log(previousSearchText);
      if (previousSearchText.current) {
        intervalRef.current = setTimeout(() => {
          confirmRef.current();
          handleFetchPaginatedProjects();
        }, 1000);
      } else {
        clearTimeout(intervalRef.current);
      }
    }
    return () => clearTimeout(intervalRef.current);
  }, [searchText, handleFetchPaginatedProjects]);

  const columnsConfig = [
    {
      title: <strong>Nome do Projeto</strong>,
      dataIndex: 'name',
      key: 'name',
      filterDropdown: ({ confirm, setSelectedKeys }) => {
        confirmRef.current = confirm;
        return (
          <div style={{ padding: 8 }}>
            <Input
              ref={searchInputRef}
              placeholder={`Nome`}
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setSelectedKeys(e.target.value ? [e.target.value] : []);
              }}
              onPressEnter={() => {
                confirm();
              }}
              style={{ width: 200, display: 'block' }}
            />
          </div>
        );
      },
      filterIcon: (filtered) => (
        <Icon
          type='search'
          style={{ color: filtered ? '#1890ff' : undefined }}
        />
      ),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInputRef.current.select());
        }
      },
      render: (value, record) => (
        <Button type='link' onClick={() => handleClickProject(record.uuid)}>
          {value}
        </Button>
      ),
    },
    {
      title: <strong>Descrição</strong>,
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: <strong>Data de Criação</strong>,
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 200,
      render: (value) => new Date(value).toLocaleString(),
    },
    {
      title: <strong>Ação</strong>,
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
      rowSelection={{
        onChange: (selectedRowKeys, selectedRows) => {
          handleSelectedProjects(selectedRowKeys);
        },
      }}
      dataSource={projects}
      columns={columnsConfig}
      pagination={false}
      loading={loading}
    />
  );
};

// PROP TYPES
ProjectsTable.propTypes = {
  /** is loading */
  loading: PropTypes.bool.isRequired,
  /** projects list */
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** projects table click project handle */
  handleClickProject: PropTypes.func.isRequired,
  /** projects table delete project handle */
  handleClickDelete: PropTypes.func.isRequired,
  /** projects table row selection project handle */
  handleRowSelection: PropTypes.func.isRequired,
};

// EXPORT
export default ProjectsTable;
