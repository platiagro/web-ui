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
  const { onSelect, templatesData, selectedRowKey } = props;

  const renderName = (text) => <strong>{text}</strong>;

  const renderUser = (user, index) => {
    /*
      TODO: Backend ainda não retorna os dados do usuário, quando retornar é só
      remover o bloco abaixo.
    */
    user = user || { userName: 'Anônimo', avatarColor: 'grey' };

    return (
      <UserAvatar
        userName={user.userName}
        key={user.userName + index}
        avatarColor={user.avatarColor}
      />
    );
  };

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
    type: 'radio',
    selectedRowKeys: [selectedRowKey],
    onChange: (selectedRowKeys) => {
      onSelect(selectedRowKeys);
    },
  };

  const onRow = (record) => {
    return {
      onClick: (event) => {
        event.stopPropagation();

        onSelect([record.uuid]);
      },
    };
  };

  return (
    <div className='templatesTable'>
      <div className='title'>
        <PartitionOutlined style={{ fontSize: '1.5em' }} />
        <h2>Fluxo de tarefas</h2>
      </div>
      <div>
        <Table
          rowSelection={rowSelection}
          rowKey='uuid'
          onRow={onRow}
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
  selectedRowKey: PropTypes.string,
};

TemplatesTable.defaultProps = {
  selectedRowKey: '',
};

export default TemplatesTable;
