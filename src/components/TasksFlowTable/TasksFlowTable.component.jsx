import React, { useRef } from 'react';
import { Table, Button, Popconfirm, Input, Space } from 'antd';
import PropTypes from 'prop-types';
import {
  ShoppingOutlined,
  ExperimentOutlined,
  CloudUploadOutlined,
  SearchOutlined,
} from '@ant-design/icons';

import UserAvatar from '../UserAvatar';

import './TasksFlowTable.style.less';

const typeIcons = {
  EXPERIMENT: (
    <div className='typeIcon experiment'>
      <ExperimentOutlined />
    </div>
  ),
  DEPLOYMENT: (
    <div className='typeIcon deployment'>
      <CloudUploadOutlined />
    </div>
  ),
};

const TasksFlowTable = ({
  onSelectRow,
  onDelete,
  tasksFlowData,
  isLoading,
  selectedRows,
}) => {
  const searchInputRef = useRef(null);

  const columns = [
    {
      title: <strong>Nome do fluxo</strong>,
      dataIndex: 'name',
      filterDropdown(filterDropdownProps) {
        const { setSelectedKeys, selectedKeys, confirm, clearFilters } =
          filterDropdownProps;

        return (
          <div style={{ padding: 8 }}>
            <Input
              ref={searchInputRef}
              placeholder={`Nome`}
              value={selectedKeys[0]}
              onChange={(e) =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onPressEnter={() => confirm()}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type='primary'
                onClick={() => confirm()}
                icon={<SearchOutlined />}
                size='small'
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters()}
                size='small'
                style={{ width: 90 }}
              >
                Reset
              </Button>
            </Space>
          </div>
        );
      },
      filterIcon(filtered) {
        return (
          <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        );
      },
      onFilter: (value, record) =>
        record ? record.name.toLowerCase().includes(value.toLowerCase()) : '',
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInputRef.current.select());
        }
      },
      render(text) {
        return <Button type='link'>{text}</Button>;
      },
    },
    {
      dataIndex: 'isMarketPlace',
      render(isMarketPlace) {
        return (
          isMarketPlace && (
            <div
              className='marketPlaceIcon'
              style={{ backgroundColor: '#722ED1' }}
            >
              <ShoppingOutlined />
            </div>
          )
        );
      },
    },
    {
      title: <strong>Descrição</strong>,
      dataIndex: 'description',
    },
    {
      title: <strong>Tipo</strong>,
      dataIndex: 'types',
      render(types) {
        return (
          types && (
            <div className='types'>{types.map((type) => typeIcons[type])}</div>
          )
        );
      },
    },
    {
      title: <strong>Origem</strong>,
      dataIndex: 'user',
      render(user, index) {
        return (
          <UserAvatar userName={'Anônimo'} key={index} avatarColor={'grey'} />
        );
      },
    },
    {
      title: <strong>Ações</strong>,
      dataIndex: 'actions',
      render(_, record) {
        return (
          <Popconfirm
            onConfirm={() => onDelete(record.uuid)}
            title='Excluir fluxo?'
            cancelText='Não'
            okText='Sim'
          >
            <Button type='link'>Excluir</Button>
          </Popconfirm>
        );
      },
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys) => onSelectRow(selectedRowKeys),
    selectedRowKeys: selectedRows,
  };

  return (
    <div className='tasksFlowTable'>
      <Table
        loading={isLoading}
        rowKey='uuid'
        columns={columns}
        dataSource={tasksFlowData}
        rowSelection={rowSelection}
        selectedRowKeys
      />
    </div>
  );
};

TasksFlowTable.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSelectRow: PropTypes.func.isRequired,
  tasksFlowData: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isMarketPlace: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      avatarColor: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  selectedRows: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TasksFlowTable;
