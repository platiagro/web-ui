import React, { useRef } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import {
  Button,
  Input,
  Popconfirm,
  Space,
  Tag,
  Tooltip,
  Typography,
} from 'antd';

import { CommonTable } from 'components';

const ProjectsTable = ({
  loading,
  projects,
  selectedProjects,
  handleClickDelete,
  handleClickProject,
  handleSelectProjects,
  handleFetchPaginatedProjects,
}) => {
  const searchInputRef = useRef(null);

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    handleFetchPaginatedProjects(selectedKeys[0]);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    handleFetchPaginatedProjects('');
  };

  const columnsConfig = [
    {
      title: <strong>Nome do Projeto</strong>,
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      filterDropdown(filterDropdownProps) {
        const { setSelectedKeys, selectedKeys, confirm, clearFilters } =
          filterDropdownProps;

        return (
          <div style={{ padding: 8 }}>
            <Input
              ref={searchInputRef}
              placeholder={`Nome`}
              value={selectedKeys[0]}
              onPressEnter={() => handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
              onChange={(e) =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
            />
            <Space>
              <Button
                type='primary'
                size='small'
                style={{ width: 90 }}
                icon={<SearchOutlined />}
                onClick={() => handleSearch(selectedKeys, confirm)}
              >
                Buscar
              </Button>
              <Button
                size='small'
                style={{ width: 90 }}
                onClick={() => handleReset(clearFilters)}
              >
                Resetar
              </Button>
            </Space>
          </div>
        );
      },
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInputRef.current.select());
        }
      },
      filterIcon(filtered) {
        return (
          <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        );
      },
      render(value, record) {
        return (
          <Button
            type='link'
            style={{ textAlign: 'left', width: '100%' }}
            onClick={() => handleClickProject(record.uuid)}
          >
            <Typography.Text
              style={{ color: '#0050B3', width: '100%' }}
              ellipsis
            >
              <Tooltip placement='topLeft' title={value}>
                {value}
              </Tooltip>
            </Typography.Text>
          </Button>
        );
      },
    },
    {
      title: <strong>Descrição</strong>,
      dataIndex: 'description',
      key: 'description',
      width: '30%',
      ellipsis: {
        showTitle: false,
      },
      render(value) {
        return (
          <Tooltip placement='topLeft' title={value}>
            {value}
          </Tooltip>
        );
      },
    },
    {
      title: <strong>Tags</strong>,
      dataIndex: 'tags',
      key: 'tags',
      width: '28%',
      filters: [
        {
          text: 'Experimentação',
          value: 'hasExperiment',
        },
        {
          text: 'Pré-implantação',
          value: 'hasPreDeployment',
        },
        {
          text: 'Implantado',
          value: 'hasDeployment',
        },
      ],
      onFilter(value, record) {
        /**
         * Utilizamos o value (hasDeployment, hasPreDeployment, hasExperiment)
         * para acessar a chave do objeto (hasDeployment, hasPreDeployment,
         * hasExperiment)
         */
        return record[value];
      },
      render(_, record) {
        return (
          <>
            {record.hasExperiment && <Tag color='purple'>Experimentação</Tag>}
            {record.hasPreDeployment && (
              <Tag color='volcano'>Pré-implantação</Tag>
            )}
            {record.hasDeployment && <Tag color='green'>Implantado</Tag>}
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
      render(_, record) {
        return (
          <Popconfirm
            title='Você tem certeza que deseja excluir esse projeto?'
            onConfirm={() => handleClickDelete(record.uuid)}
            okText='Sim'
            cancelText='Não'
          >
            <Button type='link'>Excluir</Button>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <CommonTable
      className='projectsTable'
      rowKey={(record) => record.uuid}
      rowSelection={{
        selectedRowKeys: selectedProjects,
        onChange: (selectedRowKeys) => {
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

ProjectsTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedProjects: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleClickDelete: PropTypes.func.isRequired,
  handleClickProject: PropTypes.func.isRequired,
  handleSelectProjects: PropTypes.func.isRequired,
  handleFetchPaginatedProjects: PropTypes.func.isRequired,
};

export default ProjectsTable;
