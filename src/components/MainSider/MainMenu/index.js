import React from 'react';
import { Menu } from 'antd';
import PropTypes from 'prop-types';

const MainMenu = ({ className, itemsList, selectedItems, handleItemClick }) => {
  // ! The code below may be changing a prop value. We should fix this
  const selectedItem = selectedItems[0];
  if (selectedItem === '/' || selectedItem.includes('/projetos')) {
    selectedItems[0] = '/projetos';
  } else if (selectedItem.includes('/tarefas')) {
    selectedItems[0] = '/tarefas';
  }

  return (
    <Menu
      theme='dark'
      className={className}
      selectedKeys={selectedItems}
      onClick={(e) => handleItemClick(e.key)}
    >
      {itemsList.map(({ icon, title, path }) => (
        <Menu.Item key={path} style={{ color: '#ffffff' }}>
          {icon}
          <span>{title}</span>
        </Menu.Item>
      ))}
    </Menu>
  );
};

MainMenu.propTypes = {
  className: PropTypes.string.isRequired,
  itemsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleItemClick: PropTypes.func.isRequired,
};

export default MainMenu;
