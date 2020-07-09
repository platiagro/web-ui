// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Menu, Icon } from 'antd';

// MENU COMPONENTS
const { Item } = Menu;

/**
 * Main Menu.
 * This component is responsible for displaying main menu with items.
 */
const MainMenu = ({ itemsList, selectedItems, handleItemClick, className }) => (
  // menu component
  <Menu
    className={className}
    theme='dark'
    selectedKeys={selectedItems}
    onClick={(e) => handleItemClick(e.key)}
  >
    {/* mapping menu items */}
    {itemsList.map(({ icon, title, path }) => (
      // menu item
      <Item key={path}>
        {/* menu item icon */}
        <Icon type={icon} />
        {/* menu item title */}
        <span>{title}</span>
      </Item>
    ))}
  </Menu>
);

// PROP TYPES
MainMenu.propTypes = {
  /** main menu items object list */
  itemsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** main menu selected items strings array */
  selectedItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** main menu item click function */
  handleItemClick: PropTypes.func.isRequired,
  /** main menu css class string */
  className: PropTypes.string.isRequired,
};

// EXPORT
export default MainMenu;
