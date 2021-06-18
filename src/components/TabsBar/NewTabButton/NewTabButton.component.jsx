import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';

import './NewTabButton.component.style.less';

const NewTabButton = ({ disabled, onClick }) => {
  return (
    <Button
      className='new-tab-button'
      type='add'
      size='small'
      onClick={onClick}
      disabled={disabled}
      icon={<PlusOutlined />}
    />
  );
};

NewTabButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default NewTabButton;
