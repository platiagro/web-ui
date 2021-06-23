import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const DeleteProjectsButton = ({ onDelete }) => (
  <Popconfirm
    onConfirm={() => onDelete()}
    title='Excluir fluxos selecionados?'
    cancelText='Não'
    okText='Sim'
  >
    <Button
      icon={<DeleteOutlined />}
      style={{ color: '#0050B3', marginBottom: '20px' }}
    >
      Excluir selecionados
    </Button>
  </Popconfirm>
);

DeleteProjectsButton.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default DeleteProjectsButton;
