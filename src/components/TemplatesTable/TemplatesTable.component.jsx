import PropTypes from 'prop-types';
import { PartitionOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import React from 'react';
import UserAvatar from './UserAvatar';

import './TemplatesTable.style.less';

/**
 * Componente de tabela de templates
 */
function TemplatesTable(props) {
  const { onSelect, templatesData } = props;

  const renderName = (text) => <strong>{text}</strong>;

  const renderUser = (user, index) => (
    <UserAvatar
      userName={user.username}
      key={user.name + index}
      avatarColor={user.avatarColor}
    />
  );

  const columns = [
    {
      dataIndex: 'name',
      render: renderName,
    },
    {
      dataIndex: 'description',
    },
    {
      dataIndex: 'user',
      render: renderUser,
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      onSelect(selectedRowKeys);
    },
  };

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
}

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
