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
    dataSource,
    columns,
    className,
    rowKey,
    rowSelection,
    pagination,
  } = props;

  // loading
  const isLoading = false;

  // rendering component
  return (
    <AntTable
      className={className}
      rowKey={rowKey}
      rowSelection={rowSelection}
      dataSource={dataSource}
      columns={columns}
      pagination={pagination}
      loading={isLoading}
    />
  );
};

// PROP TYPES
Table.propTypes = {
  /** Table data source (rows) */
  dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Table columns */
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** Table css class */
  className: PropTypes.string,
  /** Table row key attribute */
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /** Table row selection config */
  rowSelection: PropTypes.object,
  /** Table pagination config */
  pagination: PropTypes.any,
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
