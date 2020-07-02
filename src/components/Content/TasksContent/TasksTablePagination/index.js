// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Pagination } from 'antd';

/**
 * Projects Table Pagination.
 * This component is responsible for displaying projects table pagination.
 */
const ProjectsTablePagination = ({ pageSize, total, onChange }) => {
  return (
    <Pagination
      defaultCurrent={1}
      defaultPageSize={pageSize}
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
ProjectsTablePagination.propTypes = {
  /** current page */
  current: PropTypes.number,
  /** page size */
  pageSize: PropTypes.number,
  /** total pages  */
  total: PropTypes.number,
  /** on change page handle */
  onChange: PropTypes.func,
};

// EXPORT
export default ProjectsTablePagination;
