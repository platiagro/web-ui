import React, { useMemo } from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import { PartitionOutlined } from '@ant-design/icons';

import { UserAvatar } from 'components';

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
      // TODO: Remover bloco depois do || quando o back-end retornar os dados
      const userData = user || { userName: 'Anônimo', avatarColor: 'grey' };

      return (
        <UserAvatar
          userName={userData.userName}
          key={userData.userName + index}
          avatarColor={userData.avatarColor}
        />
      );
    },
  },
];

const TemplatesTable = ({
  onSelect,
  templatesData,
  selectedRowKey,
  loading,
}) => {
  const rowSelection = useMemo(() => {
    return {
      type: 'radio',
      selectedRowKeys: [selectedRowKey],
      onChange: (selectedRowKeys) => {
        onSelect(selectedRowKeys);
      },
    };
  }, [onSelect, selectedRowKey]);

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
          rowKey='uuid'
          onRow={onRow}
          loading={loading}
          columns={columns}
          showHeader={false}
          pagination={false}
          dataSource={templatesData}
          rowSelection={rowSelection}
        />
      </div>
    </div>
  );
};

TemplatesTable.propTypes = {
  templatesData: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      user: PropTypes.shape({
        username: PropTypes.string,
        avatarColor: PropTypes.string,
      }),
    })
  ),
  onSelect: PropTypes.func.isRequired,
  selectedRowKey: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

TemplatesTable.defaultProps = {
  selectedRowKey: '',
};

export default TemplatesTable;
