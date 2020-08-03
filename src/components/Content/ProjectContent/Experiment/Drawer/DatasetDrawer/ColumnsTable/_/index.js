// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Table, Select, Tooltip } from 'antd';

// STYLES
import './style.scss';

const { Option } = Select;
/**
 * Columns Table.
 * This component is responsible for displaying dataset columns table
 *
 * @param root0
 * @param root0.columns
 * @param root0.handleChangeType
 * @param root0.disabled
 * @param root0
 * @param root0.columns
 * @param root0.handleChangeType
 * @param root0.disabled
 * @param root0
 * @param root0.columns
 * @param root0.handleChangeType
 * @param root0.disabled
 * @param root0
 * @param root0.columns
 * @param root0.handleChangeType
 * @param root0.disabled
 * @param root0.currentPage
 * @param root0.setCurrentPage
 * @param root0.currentPage
 * @param root0.setCurrentPage
 */
const ColumnsTable = ({
  columns,
  handleChangeType,
  disabled,
  currentPage,
  setCurrentPage,
}) => {
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

  // COMPONENTS
  // type select
  const TypeSelect = ({ value, ...others }) => {
    // getting value
    let fixedVal = value;
    // types regex
    const numRegex = /num/i;
    const dateRegex = /dat/i;
    const factorRegex = /fact|cate/i;
    // checking type
    if (value.match(numRegex)) {
      fixedVal = 'Numerical';
    } else if (value.match(dateRegex)) {
      fixedVal = 'DateTime';
    } else if (value.match(factorRegex)) {
      fixedVal = 'Categorical';
    }

    // rendering component
    return (
      // select component
      <Select value={fixedVal} {...others}>
        {/* options */}
        <Option value='DateTime'>Data/Hora</Option>
        <Option value='Numerical'>Numérico</Option>
        <Option value='Categorical'>Categórico</Option>
      </Select>
    );
  };

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
      pagination={{
        current: currentPage,
        onChange: (page) => setCurrentPage(page),
      }}
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
  /** props currentPage show the current page */
  currentPage: PropTypes.number.isRequired,
  /** props setCurrentPage change the page  */
  setCurrentPage: PropTypes.func.isRequired,
};

// EXPORT
export default ColumnsTable;
