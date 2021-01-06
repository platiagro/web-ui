// REACT LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI COMPONENTS
import { LoadingOutlined, ToolOutlined } from '@ant-design/icons';
import { Button } from 'uiComponents';

/**
 * A button to prepare deployments
 *
 * @param {*} props Component props
 *
 * @returns {PrepareDeploymentsButton} Component
 *
 * @component
 */
const PrepareDeploymentsButton = (props) => {
  // destructuring props PrepareDeploymentsButton
  const { loading, disabled, onClick } = props;

  // rendering component PrepareDeploymentsButton
  return (
    <Button
      shape='round'
      type='primary-inverse'
      handleClick={onClick}
      isDisabled={disabled || loading}
    >
      {loading ? <LoadingOutlined /> : <ToolOutlined />}
      Preparar para a implantação
    </Button>
  );
};

// PROP TYPES
PrepareDeploymentsButton.propTypes = {
  /** click function */
  onClick: PropTypes.func.isRequired,
  /** prepare deployments button is loading */
  loading: PropTypes.bool.isRequired,
  /** prepare deployments button is disabled */
  disabled: PropTypes.bool.isRequired,
};

// EXPORT DEFAULT
export default PrepareDeploymentsButton;
