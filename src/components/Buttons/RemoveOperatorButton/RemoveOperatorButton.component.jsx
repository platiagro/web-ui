import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const RemoveOperatorButton = ({ handleClick, disabled, loading }) => (
  <Popconfirm
    title='Você tem certeza que deseja excluir esta tarefa?'
    onConfirm={handleClick}
    okText='Sim'
    cancelText='Não'
    disabled={disabled}
  >
    <Button disabled={disabled} shape='round' type='danger' loading={loading}>
      <DeleteOutlined />
      Excluir tarefa
    </Button>
  </Popconfirm>
);

RemoveOperatorButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default RemoveOperatorButton;
