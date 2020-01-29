// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Button } from 'antd';

/**
 * Delete Experiment Button.
 * This component is responsible for show delete experiment button.
 */
const DeleteExperimentButton = ({ handleClick, disabled }) => (
  // button component
  <Button
    disabled={disabled}
    onClick={handleClick}
    className='deleteExperimentButton'
    type='primary'
    icon='delete'
  />
);

// PROP TYPES
DeleteExperimentButton.propTypes = {
  /** delete experiment button is disabled */
  disabled: PropTypes.bool.isRequired,
  /** delete experiment button click function */
  handleClick: PropTypes.func.isRequired,
};

// EXPORT
export default DeleteExperimentButton;
