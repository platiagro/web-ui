// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Button } from 'antd';

/**
 * New usingDeployments Button.
 * This component is responsible for show new usingDeployments button.
 */
const ButtonUsingDeployments = ({ handleClick }) => (
  // button component
  <Button
    onClick={handleClick}
    icon='question-circle'
    className='newProjectButton'
    type='secondary'
  >
    Como usar um experimento implantado?
  </Button>
);

// PROP TYPES
ButtonUsingDeployments.propTypes = {
  /** new usingDeployments button click function */
  handleClick: PropTypes.func.isRequired,
};

// EXPORT
export default ButtonUsingDeployments;
