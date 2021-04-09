// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

// UI LIBS
import { Table, Select, Skeleton, Tooltip } from 'antd';

// STYLES
import './style.less';

const { Option } = Select;

const ColumnsTable = (props) => {
  // destructuring props
  const {
    columns,
    handleChangeType,
    disabled,
    currentPage,
    setCurrentPage,
    loading,
    handleRowSelection,
    selectedRows,
  } = props;

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
      render: (value, row, index) =>
        loading ? (
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
        ),
    },
    {
      title: 'Tipo de dado',
      dataIndex: 'featuretype',
      key: 'featuretype',
      render: (value, row, index) =>
        loading ? (
          <Skeleton
            active
            paragraph={{ rows: 1, width: 110 }}
            size='large'
            title={false}
          />
        ) : (
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
      rowSelection={rowSelection}
      size='small'
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
  /** Selected row */
  handleRowSelection: PropTypes.string.isRequired,
};

// EXPORT
export default ColumnsTable;
