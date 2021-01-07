import PropTypes from 'prop-types';
import React from 'react';

import { Menu, Dropdown } from 'antd';

/**
 * DeploymentFlowBox dropdown menu
 */
function DropdownMenu(props) {
  const { disabled, onEdit, onRemove, children } = props;

  const handleClick = (e) => {
    if (e.key === 'edit') onEdit();
    else if (e.key === 'remove') onRemove();
  };

  const menuOverlay = (
    <Menu onClick={handleClick}>
      <Menu.Item disabled={disabled} key='edit'>
        Editar
      </Menu.Item>
      <Menu.Item disabled={disabled} key='remove'>
        Remover
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menuOverlay} trigger={['contextMenu']}>
      {children}
    </Dropdown>
  );
}

DropdownMenu.propTypes = {
  children: PropTypes.any,
  disabled: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

DropdownMenu.defaultProps = {
  experimentIsRunning: false,
  interruptIsRunning: false,
  status: '',
  disabled: false,
};

export default DropdownMenu;
