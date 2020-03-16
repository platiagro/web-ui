// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Menu, Icon } from 'antd';

// MENU COMPONENTS
const { Item, SubMenu } = Menu;

/**
 * Components Menu.
 * This component is responsible for displaying components menu.
 */
const ComponentsMenu = ({ components, handleClick, disabled }) => {
  // COMPONENTS RENDERS
  // menu item
  const renderMenuItem = ({ title, key }) => (
    <Item disabled={disabled} key={key}>
      {title}
    </Item>
  );
  // sub menu
  const renderSubMenu = ({ title, icon, key, items }) => (
    // sub menu component
    <SubMenu
      disabled={disabled}
      key={key}
      title={
        // span container
        <span>
          {/* sub menu icon */}
          <Icon type={icon} />
          {/* sub menu title */}
          <span>{title}</span>
        </span>
      }
    >
      {/* rendering items */}
      {items.map((item) => renderMenuItem(item))}
    </SubMenu>
  );

  // RENDER
  return (
    // menu component
    <Menu onClick={handleClick} mode='inline' selectedKeys={[]}>
      {/* rendering sub menus */}
      {components.map((componentSubMenu) => {
        return renderSubMenu(componentSubMenu);
      })}
    </Menu>
  );
};

// PROP TYPES
ComponentsMenu.propTypes = {
  /** components menu click handler */
  handleClick: PropTypes.func.isRequired,
  /** components list */
  components: PropTypes.arrayOf(PropTypes.object).isRequired,
};

// EXPORT
export default ComponentsMenu;
