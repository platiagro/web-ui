// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Menu, Icon, Tooltip } from 'antd';

// UTILS
import utils from '../../../../../utils';

// MENU COMPONENTS
const { Item, SubMenu } = Menu;

/**
 * Components Menu.
 * This component is responsible for displaying components menu.
 */
const ComponentsMenu = ({ menu, handleClick, disabled }) => {
  // COMPONENTS RENDERS
  // menu item
  const renderMenuItem = ({ name, uuid, description }) => (
    <Item disabled={disabled} key={uuid}>
      {description ? (
        <Tooltip title={description} text>
          {name}
        </Tooltip>
      ) : (
        name
      )}
    </Item>
  );
  // sub menu
  const renderSubMenu = (submenu, items) => {
    // getting submenu config
    const { icon, title, key } = utils.getTagConfig(submenu);

    return (
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
  };

  // RENDER
  return (
    // menu component
    <Menu
      onClick={handleClick}
      mode='inline'
      style={{ overflow: 'auto', height: '73vh' }}
      selectedKeys={[]}
    >
      {/* rendering sub menus */}
      {Object.entries(menu).map(([submenu, items]) =>
        renderSubMenu(submenu, items)
      )}
    </Menu>
  );
};

// PROP TYPES
ComponentsMenu.propTypes = {
  /** components menu click handler */
  handleClick: PropTypes.func.isRequired,
  /** menu object */
  menu: PropTypes.objectOf(PropTypes.any).isRequired,
  /** components menu is disabled */
  disabled: PropTypes.bool.isRequired,
};

// EXPORT
export default ComponentsMenu;
