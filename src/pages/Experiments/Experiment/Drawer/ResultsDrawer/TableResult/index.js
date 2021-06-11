import React from 'react';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';

import { CommonTable } from 'components';

const TableResult = ({
  columns,
  currentPage,
  onPageChange,
  pageSize,
  rows,
  scroll,
  title,
  total,
}) => {
  return (
    <div>
      {title && (
        <p>
          <strong>{title}</strong>
        </p>
      )}

      <CommonTable
        size={'middle'}
        scroll={scroll}
        columns={columns}
        dataSource={rows}
        isLoading={false}
        rowKey={(_, index) => `table-result-${index}`}
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

TableResult.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
  pageSize: PropTypes.number,
  rows: PropTypes.array,
  scroll: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
};

TableResult.defaultProps = {
  title: undefined,
};

export default TableResult;
