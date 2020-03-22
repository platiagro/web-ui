// TODO: alterar nome para TasksMenu...

// CORE LIBS
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import ComponentsMenuSearch from '../ComponentsMenuSearch';
import ComponentsMenu from '../ComponentsMenu';

/**
 * Components Menu Block.
 * This component is responsible for displaying components menu with search.
 */
const ComponentsMenuBlock = ({
  components,
  handleComponentClick,
  handleFilter,
  disabled,
}) => {
  // RENDER
  return (
    // div container
    <div>
      {/* components menu search */}
      <ComponentsMenuSearch disabled={disabled} handleFilter={handleFilter} />
      {/* components menu */}
      <ComponentsMenu
        disabled={disabled}
        handleClick={handleComponentClick}
        components={components}
      />
    </div>
  );
};

// PROP TYPES
ComponentsMenuBlock.propTypes = {
  /** components menu block components list */
  components: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** components menu block is disabled */
  disabled: PropTypes.bool.isRequired,
  /** components menu component click handler */
  handleComponentClick: PropTypes.func.isRequired,
  /** components menu filter handler */
  handleFilter: PropTypes.func.isRequired,
};

// EXPORT
export default ComponentsMenuBlock;
