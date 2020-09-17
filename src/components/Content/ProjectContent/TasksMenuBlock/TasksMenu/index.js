// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Tooltip, Menu, Dropdown, Skeleton } from 'antd';

//COMPONENTS
import DraggableItem from './DraggableItem';

//STYLE
import './style.less';

// UTILS
import utils from '../../../../../utils';

// MENU COMPONENTS
const { Item, SubMenu } = Menu;
let templateValue;

/**
 * Tasks Menu.
 * This component is responsible for displaying tasks menu.
 */
const TasksMenu = ({
  menu,
  handleClick,
  disabled,
  handleDeleteTemplate,
  loading,
}) => {
  //DRAG
  const handleSelect = (taskId, taskType) => {
    handleClick(taskId, taskType);
  };
  // HANDLERS
  // box click
  const handleBoxClick = (uuid) => {
    handleDeleteTemplate(uuid);
  };
  const renderTooltip = (name, description, uuid) => {
    const DropDownMenu = (
      <div>
        <Menu onSelect={() => handleBoxClick(uuid)}>
          <Menu.Item key='removeTemplate'>Remover</Menu.Item>
        </Menu>
      </div>
    );

    if ('Templates' === templateValue) {
      return (
        <div>
          <Dropdown overlay={DropDownMenu} trigger={['contextMenu']}>
            <div>
              {description ? (
                <Tooltip title={description} text>
                  {name}
                </Tooltip>
              ) : (
                name
              )}
            </div>
          </Dropdown>
        </div>
      );
    } else {
      return (
        <div>
          {description ? (
            <Tooltip title={description} text>
              {name}
            </Tooltip>
          ) : (
            name
          )}
        </div>
      );
    }
  };
  // COMPONENTS RENDERS
  // menu item
  const renderMenuItem = ({ name, uuid, description }, taskType, icon) => (
    <Item disabled={disabled} key={uuid} className='draggable-item'>
      <DraggableItem
        taskId={uuid}
        taskType={taskType}
        name={name}
        icon={icon}
        handleSelect={handleSelect}
        disabled={disabled}
      >
        {renderTooltip(name, description, uuid)}
      </DraggableItem>
    </Item>
  );

  // sub menu
  const renderSubMenu = (submenu, items) => {
    // getting submenu config
    const { icon, title, key } = utils.getTagConfig(submenu);
    templateValue = title;
    return (
      // sub menu component
      <SubMenu
        key={key}
        title={
          // span container
          <span>
            {/* sub menu icon */}
            {icon}
            {/* sub menu title */}
            <span>{title}</span>
          </span>
        }
      >
        {/* rendering items */}
        {items.map((item) => renderMenuItem(item, submenu, icon))}
      </SubMenu>
    );
  };

  // RENDER
  return (
    // menu component
    <Menu mode='inline' className='task-menu-items' selectedKeys={[]}>
      {/* rendering sub menus */}
      {loading ? (
        <SubMenu
          title={
            <Skeleton
              active
              paragraph={{ rows: 1, width: 450 }}
              size='large'
              title={true}
            />
          }
          disabled
        />
      ) : (
        Object.entries(menu).map(
          ([submenu, items]) => items && renderSubMenu(submenu, items)
        )
      )}
    </Menu>
  );
};

// PROP TYPES
TasksMenu.propTypes = {
  /** tasks menu click handler */
  handleClick: PropTypes.func.isRequired,
  /** menu object */
  menu: PropTypes.objectOf(PropTypes.any).isRequired,
  /** tasks menu is disabled */
  disabled: PropTypes.bool.isRequired,
};

// EXPORT
export default TasksMenu;
