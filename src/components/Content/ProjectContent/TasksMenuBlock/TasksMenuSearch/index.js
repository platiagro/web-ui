// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';

/**
 * Tasks Menu Search.
 * This component is responsible for displaying a task menu search.
 */
const TasksMenuSearch = ({ handleFilter, disabled }) => {
  // HANDLERS
  // handle change
  const handleChange = (e) => {
    e.preventDefault();
    const filter = e.currentTarget.value;
    // filtering tasks
    handleFilter(filter);
  };

  // RENDER
  return (
    // div container
    <div
      style={{
        padding: '10px 16px',
        border: '1px solid #ddd',
      }}
    >
      {/* search input */}
      <Input
        placeholder='Pesquisar'
        allowClear
        onChange={handleChange}
        prefix={<SearchOutlined />}
      />
    </div>
  );
};

// PROP TYPES
TasksMenuSearch.propTypes = {
  /** tasks menu search on change handler */
  handleFilter: PropTypes.func.isRequired,
  /** tasks menu search is disabled */
  disabled: PropTypes.bool.isRequired,
};

// EXPORT
export default TasksMenuSearch;
