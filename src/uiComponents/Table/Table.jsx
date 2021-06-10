import React from 'react';
import PropTypes from 'prop-types';
import { Table as AntTable } from 'antd';

const Table = ({
  bordered,
  className,
  columns,
  dataSource,
  locale,
  pagination,
  rowClassName,
  rowKey,
  rowSelection,
  scroll,
  size,
}) => {
  const isLoading = false;

  return (
    <AntTable
      size={size}
      locale={locale}
      rowKey={rowKey}
      scroll={scroll}
      columns={columns}
      bordered={bordered}
      loading={isLoading}
      className={className}
      dataSource={dataSource}
      pagination={pagination}
      rowClassName={rowClassName}
      rowSelection={rowSelection}
    />
  );
};

Table.propTypes = {
  bordered: PropTypes.bool,
  className: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataSource: PropTypes.array.isRequired,
  locale: PropTypes.object,
  pagination: PropTypes.any,
  rowClassName: PropTypes.func,
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  rowSelection: PropTypes.object,
  scroll: PropTypes.object,
  size: PropTypes.string,
};

Table.defaultProps = {
  bordered: false,
  className: undefined,
  rowKey: 'uuid',
  rowSelection: undefined,
  pagination: false,
};

export default Table;
