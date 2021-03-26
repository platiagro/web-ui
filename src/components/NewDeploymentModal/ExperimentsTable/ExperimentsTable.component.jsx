import PropTypes from 'prop-types';
import { ExperimentOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import React from 'react';

import './ExperimentsTable.style.less';

/**
 * Componente de tabela de experimentos
 */
function ExperimentsTable(props) {
  const { onSelect, loading, experimentsData, selectedRowKey } = props;

  const columns = [
    {
      dataIndex: 'name',
      /* eslint-disable-next-line */
      render: (text) => <strong>{text}</strong>,
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
    <div className='experimentsTable'>
      <div className='title'>
        <ExperimentOutlined style={{ fontSize: '1.5em' }} />
        <h2>Experimentação</h2>
      </div>
      <div>
        <Table
          rowSelection={rowSelection}
          onRow={onRow}
          rowKey='uuid'
          showHeader={false}
          pagination={false}
          columns={columns}
          dataSource={experimentsData}
          loading={loading}
        />
      </div>
    </div>
  );
}

ExperimentsTable.propTypes = {
  experimentsData: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  onSelect: PropTypes.func.isRequired,
  selectedRowKey: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

ExperimentsTable.defaultProps = {
  selectedRowKey: '',
};

export default ExperimentsTable;
