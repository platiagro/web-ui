// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Icon, Input } from 'antd';

/**
 * Component Menu Search.
 * This component is responsible for displaying a component menu search.
 */
const ComponentsMenuSearch = ({ handleChange }) => (
  // div container
  <div>
    {/* search input */}
    <Input
      placeholder='Pesquisar'
      allowClear
      onChange={handleChange}
      prefix={<Icon type='search' />}
    />
  </div>
);

// PROP TYPES
ComponentsMenuSearch.propTypes = {
  /** component menu search on change handler */
  handleChange: PropTypes.func.isRequired,
};

// EXPORT
export default ComponentsMenuSearch;
