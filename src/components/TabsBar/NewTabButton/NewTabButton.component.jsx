// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

//STYLE
import './NewTabButton.component.style.less';

/**
 * New Tab Button.
 * This component is responsible for show new tab button.
 */
const NewTabButton = (props) => {
  const { disabled, onClick } = props;
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      size='small'
      type='add'
      icon={<PlusOutlined />}
      className='new-tab-button'
    />
  );
};

// PROP TYPES
NewTabButton.propTypes = {
  /** button is disabled */
  disabled: PropTypes.bool.isRequired,
  /** button click function */
  onClick: PropTypes.func.isRequired,
};

// EXPORT
export default NewTabButton;
