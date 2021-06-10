import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  TeamOutlined,
  DownOutlined,
  SearchOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import {
  Tag,
  Input,
  Space,
  Button,
  Popover,
  Tooltip,
  Skeleton,
  Popconfirm,
  Typography,
} from 'antd';

import { CommonTable } from 'components';

import './style.less';

const TasksTable = ({
  tasks,
  isLoading,
  handleCopyTask,
  handleDeleteTask,
  handleSeeTaskCode,
  handleOpenTaskDetails,
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
      onFilter: (value, record) => {
        return record
          ? record.name.toLowerCase().includes(value.toLowerCase())
          : '';
      },
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
              style={{ textAlign: 'left', width: '75%' }}
              onClick={() => handleOpenTaskDetails(record)}
            >
              <Typography.Text
                style={{ color: '#0050B3', width: '100%' }}
                ellipsis
              >
                {value}
              </Typography.Text>
            </Button>

            <Space style={{ width: '25%' }}>
              <Button className='btnTaskLockTeam' icon={<TeamOutlined />} />

              <Button
                style={{ border: 0, backgroundColor: '#722ED1' }}
                icon={<ShoppingOutlined style={{ color: 'white' }} />}
                shape='circle'
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
        return isLoading ? (
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
                  style={{
                    border: 0,
                    color: 'white',
                    backgroundColor: '#389E0D',
                  }}
                  shape='circle'
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
              onClick={() => handleSeeTaskCode(record.name)}
              type='link'
            >
              Ver código-fonte
            </Button>

            <span>|</span>

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
                    onClick={() => handleCopyTask(record)}
                  >
                    Fazer uma cópia
                  </Button>

                  <Popconfirm
                    ref={confirmPopupRef}
                    title='Você tem certeza que deseja excluir essa tarefa?'
                    onConfirm={() => handleDeleteTask(record.uuid)}
                    placement='bottomRight'
                    cancelText='Não'
                    okText='Sim'
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
      isLoading={isLoading}
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
  tasks: PropTypes.arrayOf.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleCopyTask: PropTypes.func.isRequired,
  handleDeleteTask: PropTypes.func.isRequired,
  handleSeeTaskCode: PropTypes.func.isRequired,
  handleOpenTaskDetails: PropTypes.func.isRequired,
};

export default TasksTable;
