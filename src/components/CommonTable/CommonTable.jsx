// REACT LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI COMPONENTS
import { Table, Skeleton } from 'uiComponents';

/**
 * A common table with skeleton loading.
 *
 * @param {object} props Component props
 *
 * @returns {CommonTable} Component
 *
 * @component
 */
const CommonTable = (props) => {
  // destructuring props
  const {
    isLoading,
    dataSource,
    columns,
    className,
    rowSelection,
    pagination,
  } = props;

  // skeleton columns
  const skeletonColumns = [];

  // skeleton data source
  const skeletonDataSource = [];

  // skeleton data example columns
  const skeletonDataExample = {};

  // creating skeleton columns and data example
  columns.forEach((column) => {
    skeletonColumns.push({
      ...column,
      // eslint-disable-next-line react/display-name
      render: (value, record) => <Skeleton key={`${record.uuid}-${value}`} />,
    });

    skeletonDataExample[column.key] = '';
  });

  // creating skeleton rows
  for (let i = 0; i < 10; i++) {
    // copying example with columns
    const newRow = { ...skeletonDataExample };

    // changing values of new row
    Object.keys(newRow).forEach((key) => {
      newRow[key] = `${key}-${i}`;
    });

    // defining uuid
    newRow.uuid = i;

    // adding row to datasource
    skeletonDataSource.push(newRow);
  }

  // rendering component
  return (
    <Table
      className={className}
      rowSelection={rowSelection}
      dataSource={isLoading ? skeletonDataSource : dataSource}
      columns={isLoading ? skeletonColumns : columns}
      pagination={pagination}
    />
  );
};

// PROP TYPES
CommonTable.propTypes = {
  /** Table data source (rows) */
  dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Table columns */
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Table css class */
  className: PropTypes.string,
  /** Table row selection config */
  rowSelection: PropTypes.object,
  /** Table is loading */
  isLoading: PropTypes.bool,
  /** Table pagination config */
  pagination: PropTypes.any,
};

// DEFAULT PROPS
CommonTable.defaultProps = {
  /** Table css class */
  className: undefined,
  /** Table row selection config */
  rowSelection: undefined,
  /** Table is loading */
  isLoading: true,
  /** Table pagination config */
  pagination: false,
};

// EXPORT DEFAULT
export default CommonTable;
