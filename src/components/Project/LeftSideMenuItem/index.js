import React from 'react';
import PropType from 'prop-types';
import { Icon } from 'antd';

const LeftSideMenuItem = ({ title, disabled }) => (
  <div
    onClick={() => console.log('Cliclou no menu', title)}
    className={`collapse-menu-items${disabled ? ' disabled' : ''}`}
    role='presentation'
  >
    <Icon className='icon-collapse-header' type='more' />
    {title}
  </div>
);

LeftSideMenuItem.defaultProps = {
  disabled: false,
};
LeftSideMenuItem.propTypes = {
  disabled: PropType.bool,
  title: PropType.string.isRequired,
};

export default LeftSideMenuItem;
