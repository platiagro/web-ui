// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Button, Popconfirm, Icon } from 'antd';

/**
 * Remove Operator Button.
 * This component is responsible for show remove operator button.
 */
const RemoveOperatorButton = ({ handleClick, disabled, loading }) => (
  // Popconfirm component
  <Popconfirm
    title='Você tem certeza que deseja excluir esta tarefa?'
    onConfirm={handleClick}
    okText='Sim'
    cancelText='Não'
    disabled={disabled}
  >
    {/* button component */}
    <Button
      disabled={disabled}
      className='ant-btn-oval'
      type='danger'
      loading={loading}
    >
      <Icon type='delete' theme='outlined' />
      Excluir tarefa
    </Button>
  </Popconfirm>
);

// PROP TYPES
RemoveOperatorButton.propTypes = {
  /** remove operator button is disabled */
  disabled: PropTypes.bool.isRequired,
  /** remove operator button click function */
  handleClick: PropTypes.func.isRequired,
  /** is loading */
  loading: PropTypes.bool.isRequired,
};

// EXPORT
export default RemoveOperatorButton;
