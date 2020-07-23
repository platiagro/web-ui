// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Icon as LegacyIcon } from '@ant-design/compatible';
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
        backgroundColor: '#fff',
        border: '1px solid #e8e8e8',
      }}
    >
      {/* search input */}
      <Input
        placeholder='Pesquisar'
        allowClear
        onChange={handleChange}
        prefix={<LegacyIcon type='search' />}
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
