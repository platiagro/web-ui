// CORE LIBS
import PropTypes from 'prop-types';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

// UI LIBS
import { Pagination } from 'antd';

// COMPONENTS
import { CommonTable } from 'components';

/**
 * Table Result.
 * This component is responsible for displaying table result.
 */
const TableResult = (props) => {
  const {
    columns,
    currentPage,
    onPageChange,
    pageSize,
    rows,
    scroll,
    title,
    total,
  } = props;
  return (
    <div>
      {title && (
        <p>
          <strong>{title}</strong>
        </p>
      )}
      <CommonTable
        columns={columns}
        dataSource={rows}
        isLoading={false}
        rowKey={() => {
          return uuidv4();
        }}
        size={'middle'}
        scroll={scroll}
      />
      <br />
      <Pagination
        defaultCurrent={1}
        defaultPageSize={10}
        current={currentPage}
        pageSize={pageSize}
        total={total}
        onChange={onPageChange}
        onShowSizeChange={onPageChange}
        style={{ textAlign: 'right' }}
        showSizeChanger
        pageSizeOptions={['10', '20', '30', '40', '50']}
      />
    </div>
  );
};

// PROP TYPES
TableResult.propTypes = {
  /** Table columns */
  columns: PropTypes.arrayOf(PropTypes.object),
  /** Table current page */
  currentPage: PropTypes.number,
  /** Function to handle table page change */
  onPageChange: PropTypes.func,
  /** Table page size */
  pageSize: PropTypes.number,
  /** Table rows */
  rows: PropTypes.array,
  /** Table scroll config */
  scroll: PropTypes.object,
  /** Table title */
  title: PropTypes.string,
  /** Table total rown */
  total: PropTypes.number,
};

TableResult.defaultProps = {
  /** Table title */
  title: undefined,
};

// EXPORT
export default TableResult;
