import PropTypes from 'prop-types';
import { ExperimentOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import React from 'react';

import './ExperimentsTable.style.less';

/**
 * Componente de tabela de experimentos
 */
function ExperimentsTable(props) {
  const { onSelect, experimentsData } = props;

  const columns = [
    {
      dataIndex: 'name',
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      onSelect(selectedRowKeys);
    },
  };

  return (
    <div className='experimentsTable'>
      <div className='title'>
        <ExperimentOutlined style={{ fontSize: '1.5em' }} />
        <h2>Experimentação</h2>
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
          dataSource={experimentsData}
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
};

export default ExperimentsTable;
