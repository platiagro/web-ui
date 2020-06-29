// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Pagination } from 'antd';

/**
 * Tasks Table Pagination.
 * This component is responsible for displaying tasks table pagination.
 */
const TasksTablePagination = ({ loading, pageSize, total, onChange }) => {
  return (
    <Pagination
      disabled={loading}
      defaultCurrent={1}
      defaultPageSize={10}
      pageSize={pageSize}
      total={total}
      onChange={onChange}
      onShowSizeChange={onChange}
      style={{ textAlign: 'right' }}
      showSizeChanger
      pageSizeOptions={['10', '20', '30', '40', '50']}
    />
  );
};

// PROP TYPES
TasksTablePagination.propTypes = {
  /** current page */
  current: PropTypes.number.isRequired,
  /** page size */
  pageSize: PropTypes.number.isRequired,
  /** total pages  */
  total: PropTypes.number.isRequired,
  /** on change page handle */
  onChange: PropTypes.func.isRequired,
};

// EXPORT
export default TasksTablePagination;
