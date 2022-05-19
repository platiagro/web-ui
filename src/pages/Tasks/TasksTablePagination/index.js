import React from 'react';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';

const TasksTablePagination = ({ pageSize, total, onChange }) => {
  return (
    <Pagination
      total={total}
      defaultCurrent={1}
      onChange={onChange}
      defaultPageSize={pageSize}
      onShowSizeChange={onChange}
      style={{ textAlign: 'right' }}
      pageSizeOptions={['10', '20', '30', '40', '50']}
      showSizeChanger
    />
  );
};

TasksTablePagination.propTypes = {
  pageSize: PropTypes.number,
  total: PropTypes.number,
  onChange: PropTypes.func,
};

export default TasksTablePagination;
