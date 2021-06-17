import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const DeleteProjectsButton = ({ disabled, selectedProjects, handleClick }) => (
  <Popconfirm
    onConfirm={() => handleClick(selectedProjects)}
    title='Excluir projetos selecionados?'
    cancelText='Não'
    okText='Sim'
  >
    <Button
      disabled={disabled}
      icon={<DeleteOutlined />}
      style={{ color: '#0050B3', marginLeft: '20px' }}
    >
      Excluir selecionados
    </Button>
  </Popconfirm>
);

DeleteProjectsButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  selectedProjects: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default DeleteProjectsButton;
