import React, { useMemo } from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import { ExperimentOutlined } from '@ant-design/icons';

import './ExperimentsTable.style.less';

const columns = [
  {
    dataIndex: 'name',
    render(text) {
      return <strong>{text}</strong>;
    },
  },
];

const ExperimentsTable = ({
  onSelect,
  loading,
  experimentsData,
  selectedRowKey,
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
    <div className='experimentsTable'>
      <div className='title'>
        <ExperimentOutlined style={{ fontSize: '1.5em' }} />
        <h2>Experimentação</h2>
      </div>

      <div>
        <Table
          rowKey='uuid'
          onRow={onRow}
          loading={loading}
          columns={columns}
          showHeader={false}
          pagination={false}
          rowSelection={rowSelection}
          dataSource={experimentsData}
        />
      </div>
    </div>
  );
};

ExperimentsTable.propTypes = {
  experimentsData: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  onSelect: PropTypes.func.isRequired,
  selectedRowKey: PropTypes.string,
  loading: PropTypes.bool,
};

ExperimentsTable.defaultProps = {
  selectedRowKey: '',
  loading: false,
};

export default ExperimentsTable;
