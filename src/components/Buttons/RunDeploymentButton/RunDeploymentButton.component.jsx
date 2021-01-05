// REACT LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI COMPONENTS
import { CloudUploadOutlined } from '@ant-design/icons';
import { Button } from 'uiComponents';

/**
 * A button to run deployment.
 * 
 * @param {*} props Component props
 * 
 * @returns {RunDeploymentButton} Component
 * 
 * @component
 */
const RunDeploymentButton = (props) => {
  // destructuring props
  const {
    onClick,
    disabled
  } = props;

  // rendering component
  return (
    <Button 
      type='primary'
      shape='round'
      handleClick={onClick}
      isDisabled={disabled}
    >
        <CloudUploadOutlined/> Implantar fluxo
    </Button>
  )
};

// PROP TYPES
RunDeploymentButton.propTypes = {
  /** Run deployment handler */
  onClick: PropTypes.func.isRequired,
  /** Run Deployment button is disabled */
  disabled: PropTypes.bool.isRequired,
};

// EXPORT DEFAULT
export default RunDeploymentButton;