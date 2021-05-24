import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Table, Skeleton, Tooltip } from 'antd';

import ColumnsTableTypeSelect from './ColumnsTableTypeSelect';

import './style.less';

const ColumnsTable = ({
  columns,
  handleChangeType,
  disabled,
  currentPage,
  setCurrentPage,
  loading,
  handleRowSelection,
  selectedRows,
}) => {
  const { projectId, experimentId } = useParams();

  const rowSelection = {
    type: 'radio',
    fixed: true,
    columnTitle: 'Atributo alvo',
    columnWidth: 110,
    rowKey: 'name',
    selectedRowKeys: selectedRows,
    onChange: (selectedRowKeys) => {
      handleRowSelection(selectedRowKeys, projectId, experimentId);
    },
  };

  // columns configuration
  const columnsConfig = [
    {
      title: 'Atributo',
      dataIndex: 'name',
      key: 'name',
      render(value) {
        return loading ? (
          <Skeleton
            active
            paragraph={{ rows: 1, width: 110 }}
            size='large'
            title={false}
          />
        ) : (
          <Tooltip title={value}>
            <span>{value}</span>
          </Tooltip>
        );
      },
    },
    {
      title: 'Tipo de dado',
      dataIndex: 'featuretype',
      key: 'featuretype',
      render(value, row) {
        return loading ? (
          <Skeleton
            active
            paragraph={{ rows: 1, width: 110 }}
            size='large'
            title={false}
          />
        ) : (
          <ColumnsTableTypeSelect
            disabled={disabled}
            value={value}
            onChange={(e) => {
              handleChangeType(e, row);
            }}
          />
        );
      },
    },
  ];

  const setRowKey = (record) => record.name;

  return (
    <Table
      className='datasetTable'
      dataSource={columns}
      columns={columnsConfig}
      rowKey={setRowKey}
      rowSelection={rowSelection}
      size='small'
      pagination={{
        current: currentPage,
        onChange: (page) => setCurrentPage(page),
      }}
    />
  );
};

ColumnsTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleChangeType: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  handleRowSelection: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  selectedRows: PropTypes.array.isRequired,
};

export default ColumnsTable;
