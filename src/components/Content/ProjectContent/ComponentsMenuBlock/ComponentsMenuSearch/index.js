// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Icon, Input } from 'antd';

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
    <div>
      {/* search input */}
      <Input
        disabled={disabled}
        placeholder='Pesquisar'
        allowClear
        onChange={handleChange}
        prefix={<Icon type='search' />}
      />
    </div>
  );
};

// PROP TYPES
ComponentsMenuSearch.propTypes = {
  /** component menu search on change handler */
  handleFilter: PropTypes.func.isRequired,
};

// EXPORT
export default ComponentsMenuSearch;
