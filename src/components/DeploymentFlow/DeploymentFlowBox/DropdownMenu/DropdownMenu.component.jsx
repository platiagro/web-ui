import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown } from 'antd';

const DropdownMenu = ({ disabled, onEdit, children }) => {
  const menuOverlay = (
    <Menu>
      <Menu.Item key='edit' disabled={disabled} onClick={onEdit}>
        Editar
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menuOverlay} trigger={['contextMenu']}>
      {children}
    </Dropdown>
  );
};

DropdownMenu.propTypes = {
  children: PropTypes.any,
  disabled: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
};

DropdownMenu.defaultProps = {
  status: '',
  disabled: false,
};

export default DropdownMenu;
