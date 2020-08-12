// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

//STYLE
import './style.less';

/**
 * New Experiment Button.
 * This component is responsible for show new project button.
 *
 * @param root0
 * @param root0.handleClick
 * @param root0.disabled
 * @param root0
 * @param root0.handleClick
 * @param root0.disabled
 * @param root0
 * @param root0.handleClick
 * @param root0.disabled
 */
const NewExperimentButton = ({ handleClick, disabled }) => (
  // button component
  <Button
    disabled={disabled}
    onClick={handleClick}
    size='small'
    type='add'
    icon={<PlusOutlined />}
    className='new-tab-button'
  />
);

// PROP TYPES
NewExperimentButton.propTypes = {
  /** new experiment button is disabled */
  disabled: PropTypes.bool.isRequired,
  /** new experiment button click function */
  handleClick: PropTypes.func.isRequired,
};

// EXPORT
export default NewExperimentButton;
