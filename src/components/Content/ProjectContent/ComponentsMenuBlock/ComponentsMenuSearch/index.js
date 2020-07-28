// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';

/**
 * Component Menu Search.
 * This component is responsible for displaying a component menu search.
 */
const ComponentsMenuSearch = ({ handleFilter, disabled }) => {
  // HANDLERS
  // handle change
  const handleChange = (e) => {
    e.preventDefault();
    const filter = e.currentTarget.value;
    // filtering components
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
ComponentsMenuSearch.propTypes = {
  /** component menu search on change handler */
  handleFilter: PropTypes.func.isRequired,
  /** component menu search is disabled */
  disabled: PropTypes.bool.isRequired,
};

// EXPORT
export default ComponentsMenuSearch;
