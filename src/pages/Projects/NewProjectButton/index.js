import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';

const NewProjectButton = ({ disabled, handleClick }) => (
  <Button
    className='newProjectButton'
    icon={<PlusOutlined />}
    onClick={handleClick}
    disabled={disabled}
    type='primary'
  >
    Novo Projeto
  </Button>
);

NewProjectButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default NewProjectButton;
