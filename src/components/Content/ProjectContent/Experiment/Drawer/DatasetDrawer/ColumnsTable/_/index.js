// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Table, Tooltip } from 'antd';

// COMPONENTS
import TypeSelect from '../TypeSelect';

// STYLES
import './style.scss';

/**
 * Columns Table.
 * This component is responsible for displaying dataset columns table
 */
const ColumnsTable = ({ columns, handleChangeType, disabled }) => {
  // columns configuration
  const columnsConfig = [
    {
      title: 'Atributo',
      dataIndex: 'name',
      key: 'name',
      render: (value, row, index) => (
        <Tooltip title={value}>
          <span>{value}</span>
        </Tooltip>
      ),
    },
    {
      title: 'Tipo de dado',
      dataIndex: 'featuretype',
      key: 'featuretype',
      render: (value, row, index) => (
        <TypeSelect
          disabled={disabled}
          value={value}
          onChange={(e) => {
            handleChangeType(e, row);
          }}
        />
      ),
    },
  ];

  // FUNCTIONS
  // setting row key
  const setRowKey = (record) => record.name;

  // RENDER
  return (
    // table component
    <Table
      className='datasetTable'
      dataSource={columns}
      columns={columnsConfig}
      rowKey={setRowKey}
      size='middle'
      scroll={{ y: 340 }}
    />
  );
};

// PROP TYPES
ColumnsTable.propTypes = {
  /** columns table rows list */
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** columns table change row type handler */
  handleChangeType: PropTypes.func.isRequired,
  /** columns table type change is disabled  */
  disabled: PropTypes.bool.isRequired,
};

// EXPORT
export default ColumnsTable;
