import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';

const NewTaskButton = ({ disabled, handleClick }) => (
  <Button
    className='newTaskButton'
    icon={<PlusOutlined />}
    onClick={handleClick}
    disabled={disabled}
    type='primary'
  >
    Nova Tarefa
  </Button>
);

NewTaskButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default NewTaskButton;
