import React from 'react';
import { Button } from 'antd';

import PropTypes from 'prop-types';

import { Popconfirm } from 'uiComponents';

const DeleteButton = ({ popconfirmText, handleDelete }) => {
  return (
    <Popconfirm
      okText='Sim'
      cancelText='Não'
      title={popconfirmText}
      onConfirm={handleDelete}
    >
      <Button type='link'>Excluir</Button>
    </Popconfirm>
  );
};

DeleteButton.propTypes = {
  popconfirmText: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default DeleteButton;
