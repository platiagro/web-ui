import React from 'react';
import PropTypes from 'prop-types';

import { Table, Skeleton } from 'uiComponents';

const CommonTable = ({
  bordered,
  className,
  columns,
  dataSource,
  isLoading,
  locale,
  pagination,
  rowClassName,
  rowKey,
  rowSelection,
  scroll,
  size,
  skeletonRowsAmount,
}) => {
  const skeletonColumns = [];
  const skeletonDataSource = [];
  const skeletonDataExample = {};

  columns.forEach((column) => {
    skeletonColumns.push({
      ...column,
      render(value, record) {
        return <Skeleton key={`${record.uuid}-${value}`} />;
      },
    });

    skeletonDataExample[column.key] = '';
  });

  for (let i = 0; i < skeletonRowsAmount; i++) {
    const newRow = { ...skeletonDataExample };

    Object.keys(newRow).forEach((key) => {
      newRow[key] = `${key}-${i}`;
    });

    newRow.uuid = i;
    skeletonDataSource.push(newRow);
  }

  return (
    <Table
      bordered={bordered}
      className={className}
      dataSource={isLoading ? skeletonDataSource : dataSource}
      columns={isLoading ? skeletonColumns : columns}
      locale={locale}
      pagination={pagination}
      rowClassName={rowClassName}
      rowKey={rowKey}
      rowSelection={rowSelection}
      scroll={scroll}
      size={size}
    />
  );
};

CommonTable.propTypes = {
  bordered: PropTypes.bool,
  className: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataSource: PropTypes.array,
  isLoading: PropTypes.bool,
  locale: PropTypes.object,
  pagination: PropTypes.any,
  rowClassName: PropTypes.func,
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  rowSelection: PropTypes.object,
  scroll: PropTypes.object,
  size: PropTypes.string,
  skeletonRowsAmount: PropTypes.number,
};

CommonTable.defaultProps = {
  bordered: false,
  className: undefined,
  rowSelection: undefined,
  isLoading: true,
  pagination: false,
  scroll: undefined,
  size: undefined,
  skeletonRowsAmount: 10,
};

export default CommonTable;
