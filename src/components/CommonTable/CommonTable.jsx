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
    bordered,
    className,
    columns,
    dataSource,
    isLoading,
    pagination,
    rowClassName,
    rowKey,
    rowSelection,
    scroll,
    size,
    skeletonRowsAmount,
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
  for (let i = 0; i < skeletonRowsAmount; i++) {
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
      bordered={bordered}
      className={className}
      dataSource={isLoading ? skeletonDataSource : dataSource}
      columns={isLoading ? skeletonColumns : columns}
      pagination={pagination}
      rowClassName={rowClassName}
      rowKey={rowKey}
      rowSelection={rowSelection}
      scroll={scroll}
      size={size}
    />
  );
};

// PROP TYPES
CommonTable.propTypes = {
  /** Table bordered */
  bordered: PropTypes.bool,
  /** Table css class */
  className: PropTypes.string,
  /** Table columns */
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Table data source (rows) */
  dataSource: PropTypes.array.isRequired,
  /** Table is loading */
  isLoading: PropTypes.bool,
  /** Table pagination config */
  pagination: PropTypes.any,
  /** Table row class name */
  rowClassName: PropTypes.func,
  /** Table row key attribute */
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /** Table row selection config */
  rowSelection: PropTypes.object,
  /** Table scroll config */
  scroll: PropTypes.object,
  /** Table column size config */
  size: PropTypes.string,
  /** Table skeleton rows amount */
  skeletonRowsAmount: PropTypes.number,
};

// DEFAULT PROPS
CommonTable.defaultProps = {
  /** Table bordered */
  bordered: false,
  /** Table css class */
  className: undefined,
  /** Table row selection config */
  rowSelection: undefined,
  /** Table is loading */
  isLoading: true,
  /** Table pagination config */
  pagination: false,
  /** Table scroll config */
  scroll: undefined,
  /** Table column size config */
  size: undefined,
  /** Table skeleton rows amount config */
  skeletonRowsAmount: 10,
};

// EXPORT DEFAULT
export default CommonTable;
