/* eslint-disable react/display-name */
// CORE LIBS
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { CommonTable } from 'components';

// UI LIBS
import { SearchOutlined } from '@ant-design/icons';
import {
  Button,
  Input,
  Popconfirm,
  Space,
  Tag,
  Tooltip,
  Typography,
} from 'antd';

const { Text } = Typography;

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
  handleSelectProjects,
}) => {
  const [searchText, setSearchText] = useState('');
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

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const columnsConfig = [
    {
      title: <strong>Nome do Projeto</strong>,
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={searchInputRef}
            placeholder={`Nome`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type='primary'
              onClick={() => handleSearch(selectedKeys, confirm)}
              icon={<SearchOutlined />}
              size='small'
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => handleReset(clearFilters)}
              size='small'
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInputRef.current.select());
        }
      },
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      render: (value, record) => (
        <Button
          type='link'
          onClick={() => handleClickProject(record.uuid)}
          style={{ textAlign: 'left', width: '100%' }}
        >
          <Text ellipsis style={{ color: '#0050B3', width: '100%' }}>
            {value}
          </Text>
        </Button>
      ),
    },
    {
      title: <strong>Descrição</strong>,
      dataIndex: 'description',
      key: 'description',
      width: '30%',
      ellipsis: {
        showTitle: false,
      },
      render: (value, record) => (
        <Tooltip placement='topLeft' title={value}>
          {value}
        </Tooltip>
      ),
    },
    {
      title: <strong>Tags</strong>,
      dataIndex: 'tags',
      key: 'tags',
      width: '28%',
      filters: [
        {
          text: 'Experimentação',
          value: 'Experimentação',
        },
        {
          text: 'Pré-implantação',
          value: 'Pré-implantação',
        },
        {
          text: 'Implantado',
          value: 'Implantado',
        },
      ],
      onFilter: (value, record) => {
        return record.tags ? record.tags.indexOf(value) === 0 : false;
      },
      render: (tags, record) => {
        return (
          <>
            <Tag color='purple'>Experimentação</Tag>
            {record.implanted && <Tag color='green'>Implantado</Tag>}
          </>
        );
      },
    },
    {
      title: <strong>Última modificação</strong>,
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: '12%',
      sorter: (a, b) => {
        const dateA = new Date(a.updatedAt);
        const dateB = new Date(b.updatedAt);
        return dateA.getTime() - dateB.getTime();
      },
      sortDirections: ['descend', 'ascend'],
      render: (value) => new Date(value).toLocaleString(),
    },
    {
      title: <strong>Ação</strong>,
      dataIndex: 'action',
      key: 'action',
      width: '10%',
      render: (value, record) => (
        <Popconfirm
          title='Você tem certeza que deseja excluir esse projeto?'
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
  return (
    <CommonTable
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
      isLoading={loading}
    />
  );
};

// PROP TYPES
ProjectsTable.propTypes = {
  /** is loading */
  loading: PropTypes.bool.isRequired,
  /** projects list */
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** selected projects list */
  selectedProjects: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** projects table click project handle */
  handleClickProject: PropTypes.func.isRequired,
  /** projects table delete project handle */
  handleClickDelete: PropTypes.func.isRequired,
  /** fetch paginated projects handle */
  handleFetchPaginatedProjects: PropTypes.func.isRequired,
  /** projects table row selection project handle */
  handleSelectProjects: PropTypes.func.isRequired,
};

// EXPORT
export default ProjectsTable;
