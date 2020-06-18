// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Spin } from 'antd';

// COMPONENTS
import ComponentsMenuSearch from '../ComponentsMenuSearch';
import ComponentsMenu from '../ComponentsMenu';

/**
 * Components Menu Block.
 * This component is responsible for displaying components menu with search.
 */
const ComponentsMenuBlock = ({
  menu,
  loading,
  handleComponentClick,
  handleFilter,
  disabled,
  handleDeleteTemplate,
}) => {
  // RENDER
  return (
    // div container
    <div>
      {/* components menu search */}
      <ComponentsMenuSearch disabled={disabled} handleFilter={handleFilter} />
      {loading ? (
        // loading
        <Spin style={{ marginTop: '20px' }} />
      ) : (
        // components menu
        <ComponentsMenu
          disabled={disabled}
          handleClick={handleComponentClick}
          handleDeleteTemplate={handleDeleteTemplate}
          menu={menu}
        />
      )}
    </div>
  );
};

// PROP TYPES
ComponentsMenuBlock.propTypes = {
  /** components menu block components list */
  menu: PropTypes.objectOf(PropTypes.any).isRequired,
  /** components menu block is disabled */
  disabled: PropTypes.bool.isRequired,
  /** components menu component click handler */
  handleComponentClick: PropTypes.func.isRequired,
  /** components menu filter handler */
  handleFilter: PropTypes.func.isRequired,
  /** is loading */
  loading: PropTypes.bool.isRequired,
};

// EXPORT
export default ComponentsMenuBlock;
