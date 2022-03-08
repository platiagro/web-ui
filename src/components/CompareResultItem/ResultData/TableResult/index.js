import React, { useMemo } from 'react';
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
  const rowsWithId = useMemo(() => {
    if (!rows) return [];
    return rows.map((row, index) => ({ ...row, uuid: `uuid-${index}` }));
  }, [rows]);

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
        isLoading={false}
        dataSource={rowsWithId}
        rowKey={(record) => record.uuid}
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
