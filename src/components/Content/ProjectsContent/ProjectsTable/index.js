import './style.scss';

// CORE LIBS
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Popconfirm, Popover, Table } from 'antd';

/**
 * Projects Table.
 * This component is responsible for displaying projects table.
 */
const ProjectsTable = ({
  loading,
  projects,
  selectedProjects,
  handleClickProject,
  handleClickDelete,
  handleFetchPaginatedProjects,
  handleShowNewProjectModal,
  handleSelectProjects,
}) => {
  const [searchText, setSearchText] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);
  const intervalRef = useRef(null);
  const previousSearchText = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchText) {
      intervalRef.current = setTimeout(() => {
        previousSearchText.current = searchText;
        handleFetchPaginatedProjects(searchText);
      }, 1000);
    } else {
      if (previousSearchText.current) {
        intervalRef.current = setTimeout(() => {
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
      title: (
        <div>
          <strong>Nome do Projeto</strong>
          <Popover
            placement='bottom'
            visible={searchVisible}
            content={
              <Input
                ref={searchInputRef}
                placeholder={`Nome`}
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
                style={{ width: 200, display: 'fixed' }}
              />
            }
          >
            <Button
              shape='circle'
              icon={<SearchOutlined />}
              size='small'
              style={{
                background: '#D3D3D3',
                marginLeft: 40,
              }}
              onClick={() => {
                if (searchVisible) {
                  setSearchVisible(false);
                } else {
                  setSearchVisible(true);
                  setTimeout(() => searchInputRef.current.select());
                }
              }}
            />
          </Popover>
        </div>
      ),
      dataIndex: 'name',
      key: 'name',
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
        selectedRowKeys: selectedProjects,
        onChange: (selectedRowKeys, selectedRows) => {
          handleSelectProjects(selectedRowKeys);
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
  handleSelectProjects: PropTypes.func.isRequired,
};

// EXPORT
export default ProjectsTable;
