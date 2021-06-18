import React, { useMemo } from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import { PartitionOutlined } from '@ant-design/icons';

import UserAvatar from './UserAvatar';

import './TemplatesTable.style.less';

const columns = [
  {
    dataIndex: 'name',
    render(text) {
      return <strong>{text}</strong>;
    },
  },
  {
    dataIndex: 'description',
  },
  {
    dataIndex: 'user',
    render(user, index) {
      return (
        <UserAvatar
          userName={user.username}
          key={user.name + index}
          avatarColor={user.avatarColor}
        />
      );
    },
  },
];

const TemplatesTable = ({ onSelect, templatesData }) => {
  const rowSelection = useMemo(() => {
    return {
      onChange: (selectedRowKeys) => {
        onSelect(selectedRowKeys);
      },
    };
  }, [onSelect]);

  return (
    <div className='templatesTable'>
      <div className='title'>
        <PartitionOutlined style={{ fontSize: '1.5em' }} />
        <h2>Fluxo de tarefas</h2>
      </div>

      <div>
        <Table
          rowSelection={{
            type: 'radio',
            ...rowSelection,
          }}
          rowKey='uuid'
          showHeader={false}
          pagination={false}
          columns={columns}
          dataSource={templatesData}
        />
      </div>
    </div>
  );
};

TemplatesTable.propTypes = {
  templatesData: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        avatarColor: PropTypes.string.isRequired,
      }).isRequired,
    })
  ),
  onSelect: PropTypes.func.isRequired,
};

export default TemplatesTable;
