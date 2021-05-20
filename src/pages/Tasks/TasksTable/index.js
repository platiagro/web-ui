import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  DownOutlined,
  SearchOutlined,
  ShoppingOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import {
  Button,
  Input,
  Popconfirm,
  Popover,
  Space,
  Tag,
  Tooltip,
  Typography,
  Skeleton,
} from 'antd';

import { CommonTable } from 'components';

import './style.less';

const TasksTable = ({
  tasks,
  loading,
  handleClickTask,
  handleClickEdit,
  handleClickDelete,
  handleCopyTaskRequest,
}) => {
  const searchInputRef = useRef(null);
  const confirmPopupRef = useRef(null);

  const columnsConfig = [
    {
      title: <strong>Nome da Tarefa</strong>,
      dataIndex: 'name',
      key: 'name',
      width: '25%',
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
      render(value, record) {
        return (
          <div>
            <Button
              type='link'
              onClick={() => handleClickEdit(record)}
              style={{ textAlign: 'left', width: '75%' }}
            >
              <Typography.Text
                ellipsis
                style={{ color: '#0050B3', width: '100%' }}
              >
                {value}
              </Typography.Text>
            </Button>
            <Space style={{ width: '25%' }}>
              <Button className='btnTaskLockTeam' icon={<TeamOutlined />} />

              <Button
                icon={<ShoppingOutlined style={{ color: 'white' }} />}
                shape='circle'
                style={{ border: 0, backgroundColor: '#722ED1' }}
              />
            </Space>
          </div>
        );
      },
    },
    {
      title: <strong>Descrição</strong>,
      dataIndex: 'description',
      key: 'description',
      width: '35%',
      ellipsis: {
        showTitle: false,
      },
      render(value) {
        return loading ? (
          <Skeleton
            active
            paragraph={{ rows: 1, width: 250 }}
            size='large'
            title={false}
          />
        ) : (
          <Tooltip placement='topLeft' title={value}>
            {value}
          </Tooltip>
        );
      },
    },
    {
      title: <strong>Origem</strong>,
      dataIndex: 'source',
      key: 'source',
      width: '17%',
      render(_, record) {
        return (
          <Space size={8}>
            <Popover
              placement='bottomLeft'
              content={
                <>
                  <Space>
                    <ShoppingOutlined style={{ fontSize: '20px' }} />
                    <strong>{record.name}</strong>
                  </Space>
                  <div style={{ marginLeft: '28px' }}>
                    <Typography.Text strong>Autor: PlatIAgro</Typography.Text>
                    <br />
                    <Typography.Text strong>
                      Atualizada em 15/06/2020
                    </Typography.Text>
                    <br />
                    <br />
                    <Typography.Text strong>
                      A sua cópia foi feita em 10/06/2020
                    </Typography.Text>
                  </div>
                </>
              }
            >
              <Space size={8}>
                <Button
                  shape='circle'
                  style={{
                    color: 'white',
                    backgroundColor: '#389E0D',
                    border: 0,
                  }}
                >
                  P
                </Button>
                <Button className='btnTaskOrigin' type='link'>
                  platiagro
                </Button>
              </Space>
            </Popover>
            {record.createdAt !== record.updatedAt ? (
              <Tag>Modificada</Tag>
            ) : null}
          </Space>
        );
      },
    },
    {
      title: <strong>Ação</strong>,
      dataIndex: 'action',
      key: 'action',
      width: '18%',
      render(_, record) {
        return (
          <Space size={8}>
            <Button
              className='btnTaskActions'
              onClick={() => handleClickTask(record.name)}
              type='link'
            >
              Ver código-fonte
            </Button>
            |
            <Popover
              overlayClassName='more-actions-popover'
              placement='bottom'
              onVisibleChange={(visible) => {
                if (!visible && confirmPopupRef.current.props.visible) {
                  confirmPopupRef.current.onClick();
                }
              }}
              content={
                <div style={{ width: '140px' }}>
                  <Button
                    className='btnTaskMoreActions'
                    type='text'
                    onClick={() => handleCopyTaskRequest(record)}
                  >
                    Fazer uma cópia
                  </Button>
                  <Popconfirm
                    ref={confirmPopupRef}
                    title='Você tem certeza que deseja excluir essa tarefa?'
                    onConfirm={() => handleClickDelete(record.uuid)}
                    okText='Sim'
                    cancelText='Não'
                    placement='bottomRight'
                  >
                    <Button className='btnTaskMoreActions' type='text'>
                      Excluir
                    </Button>
                  </Popconfirm>
                </div>
              }
            >
              <Button className='btnTaskActions' type='link'>
                Mais <DownOutlined />
              </Button>
            </Popover>
          </Space>
        );
      },
    },
  ];

  return (
    <CommonTable
      dataSource={tasks}
      isLoading={loading}
      className='tasksTable'
      columns={columnsConfig}
      rowKey={(record) => record.uuid}
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30', '40', '50'],
      }}
    />
  );
};

TasksTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleClickTask: PropTypes.func.isRequired,
  handleClickEdit: PropTypes.func.isRequired,
  handleClickDelete: PropTypes.func.isRequired,
  handleCopyTaskRequest: PropTypes.func.isRequired,
};

export default TasksTable;
