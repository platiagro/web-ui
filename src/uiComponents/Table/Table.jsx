// REACT LIBS
import React from 'react';
import PropTypes from 'prop-types';

// ANTD UI LIB COMPONENTS
import { Table as AntTable } from 'antd';

/**
 * Simple table based in Ant Design table.
 *
 * https://ant.design/components/table/
 *
 * @param {object} props Component props
 *
 * @returns {Table} Component
 *
 * @component
 */
const Table = (props) => {
  // destructuring props
  const {
    className,
    columns,
    dataSource,
    pagination,
    rowKey,
    rowSelection,
    scroll,
    size,
  } = props;

  // loading
  const isLoading = false;

  // rendering component
  return (
    <AntTable
      className={className}
      columns={columns}
      dataSource={dataSource}
      loading={isLoading}
      pagination={pagination}
      rowKey={rowKey}
      rowSelection={rowSelection}
      scroll={scroll}
      size={size}
    />
  );
};

// PROP TYPES
Table.propTypes = {
  /** Table css class */
  className: PropTypes.string,
  /** Table columns */
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Table data source (rows) */
  dataSource: PropTypes.array.isRequired,
  /** Table pagination config */
  pagination: PropTypes.any,
  /** Table row key attribute */
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /** Table row selection config */
  rowSelection: PropTypes.object,
  /** Table scroll config */
  scroll: PropTypes.object,
  /** Table column size config */
  size: PropTypes.string,
};

// DEFAULT PROPS
Table.defaultProps = {
  /** Table css class */
  className: undefined,
  /** Table row key attribute */
  rowKey: 'uuid',
  /** Table row selection config */
  rowSelection: undefined,
  /** Table pagination config */
  pagination: false,
};

// EXPORT DEFAULT
export default Table;
