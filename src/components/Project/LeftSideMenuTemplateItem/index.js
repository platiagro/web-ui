import React from 'react';
import PropType from 'prop-types';
import { Icon } from 'antd';

const TemplateItem = ({ handleClick, template, disabled = false }) => (
  <div
    onClick={() => {
      handleClick(template);
    }}
    className={`collapse-menu-items${template.disabled ? ' disabled' : ''}${
      disabled ? ' disabled' : ''
    }`}
    role='presentation'
  >
    <Icon className='icon-collapse-header' type='more' />
    {template.name}
  </div>
);

export default TemplateItem;
