// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Button, Popconfirm } from 'antd';

/**
 * Delete Projects Button.
 * This component is responsible for delete projects button.
 */
const DeleteProjectsButton = ({ disabled, selectedProjects, handleClick }) => (
  <Popconfirm
    title='Excluir projetos selecionados?'
    onConfirm={() => handleClick(selectedProjects)}
    okText='Sim'
    cancelText='Não'
  >
    <Button
      disabled={disabled}
      icon='delete'
      style={{ color: '#0050B3', marginLeft: '20px' }}
    >
      Excluir selecionados
    </Button>
  </Popconfirm>
);

// PROP TYPES
DeleteProjectsButton.propTypes = {
  /** new project button is disabled */
  disabled: PropTypes.bool.isRequired,
  /** selected projects to be deleted */
  selectedProjects: PropTypes.array.isRequired,
  /** new project button click function */
  handleClick: PropTypes.func.isRequired,
};

// EXPORT
export default DeleteProjectsButton;
