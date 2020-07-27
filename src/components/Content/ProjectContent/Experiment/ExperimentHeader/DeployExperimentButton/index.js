// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { LoadingOutlined, ToolOutlined } from '@ant-design/icons';
import { Button } from 'antd';

/**
 * Deploy Experiment Button.
 * This component is responsible for show deploy experiment button.
 */
const DeployExperimentButton = ({ handleClick, disabled, loading }) => (
  // button component
  <Button
    disabled={disabled}
    onClick={handleClick}
    className='ant-btn-oval'
    type='primary'
  >
    {loading ? <LoadingOutlined /> : <ToolOutlined />}
    Implantar
  </Button>
);

// PROP TYPES
DeployExperimentButton.propTypes = {
  /** deploy experiment button is disabled */
  disabled: PropTypes.bool.isRequired,
  /** deploy experiment button click function */
  handleClick: PropTypes.func.isRequired,
  /** deployment is running / loading */
  loading: PropTypes.bool.isRequired,
};

// EXPORT
export default DeployExperimentButton;
