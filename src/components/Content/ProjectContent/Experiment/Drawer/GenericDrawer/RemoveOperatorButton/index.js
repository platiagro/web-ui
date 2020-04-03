// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Button, Popconfirm } from 'antd';

/**
 * Remove Operator Button.
 * This component is responsible for show remove operator button.
 */
const RemoveOperatorButton = ({ handleClick, disabled, loading }) => (
  // Popconfirm component
  <Popconfirm
    title='Você tem certeza que deseja excluir esse operador?'
    onConfirm={handleClick}
    okText='Sim'
    cancelText='Não'
  >
    {/* button component */}
    <Button
      disabled={disabled}
      className='removeOperatorButton'
      type='danger'
      icon='delete'
      style={{ float: 'right' }}
      loading={loading}
    />
  </Popconfirm>
);

// TODO: add loading props
// PROP TYPES
RemoveOperatorButton.propTypes = {
  /** remove operator button is disabled */
  disabled: PropTypes.bool.isRequired,
  /** remove operator button click function */
  handleClick: PropTypes.func.isRequired,
};

// EXPORT
export default RemoveOperatorButton;
