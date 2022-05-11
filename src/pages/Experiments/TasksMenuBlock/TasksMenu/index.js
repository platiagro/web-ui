import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Tooltip, Menu, Dropdown, Skeleton } from 'antd';

import utils from 'utils';

import DraggableItem from './DraggableItem';

import './style.less';

const TasksMenu = ({
  menu,
  loading,
  disabled,
  handleClick,
  handleDeleteTemplate,
}) => {
  const handleSelect = (taskId, taskType, position) => {
    handleClick(taskId, taskType, position);
  };

  const handleBoxClick = (uuid) => {
    handleDeleteTemplate(uuid);
  };

  const renderTooltip = (name, description, uuid, title) => {
    const tooltip = (
      <Tooltip
        title={() => {
          return (
            <>
              <div
                style={{ color: 'white', fontWeight: '900', fontSize: '16px' }}
              >
                {name}
              </div>
              {!!description && <div>{description}</div>}
            </>
          );
        }}
      >
        {name}
      </Tooltip>
    );

    if ('Templates' === title) {
      return (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key='removeTemplate'
                onClick={() => handleBoxClick(uuid)}
              >
                Remover
              </Menu.Item>
            </Menu>
          }
          trigger={['contextMenu']}
        >
          {tooltip}
        </Dropdown>
      );
    }

    return tooltip;
  };

  const renderMenuItem = (
    { name, uuid, description },
    taskType,
    icon,
    title
  ) => (
    <Menu.Item disabled={disabled} key={uuid} className='draggable-item'>
      <DraggableItem
        name={name}
        icon={icon}
        taskId={uuid}
        disabled={disabled}
        taskType={taskType}
        handleSelect={handleSelect}
        tutorialUrl= {'https://google.com'}
      >
        {renderTooltip(name, description, uuid, title)}
      </DraggableItem>
    </Menu.Item>
  );

  const renderSubMenu = (submenu, items) => {
    const tagConfig = utils.getTagConfig(submenu);
    if (!tagConfig) return null;

    const { icon, title, key } = tagConfig;

    return (
      <Menu.SubMenu
        key={key}
        title={
          <span>
            {icon}
            <span>{title}</span>
          </span>
        }
      >
        {items.map((item) => renderMenuItem(item, submenu, icon, title))}
      </Menu.SubMenu>
    );
  };

  return (
    <Menu mode='inline' className='task-menu-items' selectedKeys={[]}>
      {loading ? (
        <Menu.SubMenu
          title={
            <Skeleton
              active
              size='large'
              title={true}
              paragraph={{ rows: 1, width: 450 }}
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

TasksMenu.propTypes = {
  menu: PropTypes.objectOf(PropTypes.any).isRequired,
  loading: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleDeleteTemplate: PropTypes.func.isRequired,
};

export default memo(TasksMenu);
