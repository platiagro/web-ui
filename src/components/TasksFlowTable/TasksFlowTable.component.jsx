import React from 'react';
import { Table, Button, Popconfirm } from 'antd';
import PropTypes from 'prop-types';
import {
  ShoppingOutlined,
  ExperimentOutlined,
  CloudUploadOutlined,
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
}) => {
  const columns = [
    {
      title: <strong>Nome do fluxo</strong>,
      dataIndex: 'name',
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
  };

  return (
    <div className='tasksFlowTable'>
      <Table
        loading={isLoading}
        rowKey='uuid'
        columns={columns}
        dataSource={tasksFlowData}
        rowSelection={rowSelection}
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
};

export default TasksFlowTable;
