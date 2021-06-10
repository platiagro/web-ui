import React from 'react';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';

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

ProjectsTablePagination.propTypes = {
  disabled: PropTypes.bool.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ProjectsTablePagination;
