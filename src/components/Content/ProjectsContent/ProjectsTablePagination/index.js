// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Pagination } from 'antd';

/**
 * Projects Table Pagination.
 * This component is responsible for displaying projects table pagination.
 */
const ProjectsTablePagination = ({
  disabled,
  currentPage,
  pageSize,
  total,
  onChange,
}) => {
  return (
    <Pagination
      disabled={disabled}
      defaultCurrent={1}
      defaultPageSize={10}
      current={currentPage}
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
ProjectsTablePagination.propTypes = {
  /** pagination is disabled */
  disabled: PropTypes.bool.isRequired,
  /** current page */
  currentPage: PropTypes.number.isRequired,
  /** page size */
  pageSize: PropTypes.number.isRequired,
  /** total pages  */
  total: PropTypes.number.isRequired,
  /** on change page handle */
  onChange: PropTypes.func.isRequired,
};

// EXPORT
export default ProjectsTablePagination;
