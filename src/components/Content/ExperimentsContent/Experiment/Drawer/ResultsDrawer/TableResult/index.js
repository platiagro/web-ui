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
  const { onPageChange, resultTable } = props;
  const { columns, currentPage, pageSize, rows, title, total } = resultTable;
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
      <br />
    </div>
  );
};

// PROP TYPES
TableResult.propTypes = {
  /** function to handle table page change */
  onPageChange: PropTypes.func.isRequired,
  /** object with table informations */
  resultTable: PropTypes.object.isRequired,
  /** table title */
  title: PropTypes.string,
};

TableResult.defaultProps = {
  /** table title */
  title: undefined,
};

// EXPORT
export default TableResult;
