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
const ComponentsMenuBlock = ({ components, disabled }) => {
  // HOOKS
  // filtered components hook
  const [filteredComponents, setFilteredComponents] = useState(components);

  // FUNCTIONS
  // filter components
  const filterComponents = (filter) => {
    // filter is empty
    if (!filter) return setFilteredComponents(components);

    // convert filter to lower case
    const lowerCaseFilter = filter.toLowerCase();

    // filtering components
    const newFilteredComponents = components.filter((componentSubMenu) => {
      // iterating the sub menus
      const filteredSubMenu = componentSubMenu.items.filter((item) => {
        // convert item title to lower case
        const lowerCaseTitle = item.title.toLowerCase();

        // filter components
        return lowerCaseTitle.includes(lowerCaseFilter);
      });
      // filter sub menus
      return filteredSubMenu.length > 0;
    });
    return setFilteredComponents(newFilteredComponents);
  };

  // RENDER
  return (
    // div container
    <div>
      {/* components menu search */}
      <ComponentsMenuSearch
        disabled={disabled}
        handleFilter={filterComponents}
      />
      {/* components menu */}
      <ComponentsMenu
        disabled={disabled}
        handleClick={(e) => alert(e.key)}
        components={filteredComponents}
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
};

// EXPORT
export default ComponentsMenuBlock;
