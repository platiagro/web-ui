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
const ComponentsMenuBlock = ({ components }) => {
  // HOOKS
  // filtered components hook
  const [filteredComponents, setFilteredComponents] = useState(components);

  // FUNCTIONS
  // filter components
  const filterComponents = (filter) => {
    // filter is empty
    if (!filter) return setFilteredComponents(components);

    // convert filter to lower case
    const lowerFilter = filter.toLowerCase();

    // filtering components
    const newFilteredComponents = components.filter((componentSubMenu) => {
      const filteredSubMenu = componentSubMenu.items.filter((item) => {
        return item.title.toLowerCase().includes(lowerFilter);
      });
      return filteredSubMenu.length > 0;
    });
    return setFilteredComponents(newFilteredComponents);
  };

  // RENDER
  return (
    // div container
    <div>
      {/* components menu search */}
      <ComponentsMenuSearch handleFilter={filterComponents} />
      {/* components menu */}
      <ComponentsMenu
        handleClick={(e) => alert(e.key)}
        components={filteredComponents}
      />
    </div>
  );
};

// PROP TYPES
ComponentsMenuBlock.propTypes = {
  /** components list */
  components: PropTypes.arrayOf(PropTypes.object).isRequired,
};

// EXPORT
export default ComponentsMenuBlock;
