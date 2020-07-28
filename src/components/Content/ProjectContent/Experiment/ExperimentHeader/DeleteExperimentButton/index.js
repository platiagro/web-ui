// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';

/**
 * Delete Experiment Button.
 * This component is responsible for show delete experiment button.
 */
const DeleteExperimentButton = ({ handleClick, disabled, loading }) => (
  // Popconfirm component
  <Popconfirm
    title='Você tem certeza que deseja excluir esse experimento?'
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
      style={{ float: 'right' }}
      loading={loading}
    >
      <DeleteOutlined />
      Excluir
    </Button>
  </Popconfirm>
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
