/* eslint-disable react/display-name */
import './style.less';

// CORE LIBS
import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { CommonTable } from 'components';

// UI LIBS
import {
  DownOutlined,
  LockOutlined,
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

const { Text } = Typography;

/**
 * Tasks Table.
 * This component is responsible for displaying tasks table.
 *
 * @component
 * @param {object} props Component props
 * @returns {TasksTable} React component
 */
const TasksTable = (props) => {
  const {
    containerState,
    handleClickTask,
    handleClickEdit,
    handleClickDelete,
    handleCopyTaskRequest,
    loading,
    tasks,
  } = props;

  const searchInputRef = useRef(null);
  const confirmPopupRef = useRef(null);

  // table columns config
  const columnsConfig = [
    {
      title: <strong>Nome da Tarefa</strong>,
      dataIndex: 'name',
      key: 'name',
      width: '25%',
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
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record ? record.name.toLowerCase().includes(value.toLowerCase()) : '',
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInputRef.current.select());
        }
      },
      render: (value, record) => {
        const random = Math.round(Math.random());
        return (
          <div>
            <Button
              type='link'
              onClick={() => handleClickEdit(record)}
              style={{ textAlign: 'left', width: '75%' }}
            >
              <Text ellipsis style={{ color: '#0050B3', width: '100%' }}>
                {value}
              </Text>
            </Button>
            <Space style={{ width: '25%' }}>
              {random === 0 ? (
                <Button
                  className='btnTaskLockTeam'
                  icon={<TeamOutlined />}
                ></Button>
              ) : (
                <Button
                  className='btnTaskLockTeam'
                  icon={<LockOutlined />}
                ></Button>
              )}
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
      render: (value, record) =>
        loading ? (
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
        ),
    },
    {
      title: <strong>Origem</strong>,
      dataIndex: 'source',
      key: 'source',
      width: '17%',
      render: (value, record) => (
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
                  <Text strong>Autor: PlatIAgro</Text>
                  <br />
                  <Text strong>Atualizada em 15/06/2020</Text>
                  <br />
                  <br />
                  <Text strong>A sua cópia foi feita em 10/06/2020</Text>
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
          {record.createdAt !== record.updatedAt ? <Tag>Modificada</Tag> : null}
        </Space>
      ),
    },
    {
      title: <strong>Ação</strong>,
      dataIndex: 'action',
      key: 'action',
      width: '18%',
      render: (value, record) => (
        <Space size={8}>
          <Button
            className='btnTaskActions'
            disabled={!containerState}
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
      ),
    },
  ];

  // RENDER
  return (
    <CommonTable
      className='tasksTable'
      rowKey={(record) => record.uuid}
      dataSource={tasks}
      columns={columnsConfig}
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30', '40', '50'],
      }}
      isLoading={loading}
    />
  );
};

// PROP TYPES
TasksTable.propTypes = {
  /** notebook server container state */
  containerState: PropTypes.bool.isRequired,
  /** tasks table click task handle */
  handleClickTask: PropTypes.func.isRequired,
  /** tasks table click edit handle */
  handleClickEdit: PropTypes.func.isRequired,
  /** tasks table click delete handle */
  handleClickDelete: PropTypes.func.isRequired,
  /** tasks table is loading */
  loading: PropTypes.bool.isRequired,
  /** tasks list */
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

// EXPORT
export default TasksTable;
