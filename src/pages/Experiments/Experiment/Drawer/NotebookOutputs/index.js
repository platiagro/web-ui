import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { CodeOutlined } from '@ant-design/icons';

const NotebookOutputs = ({ handleOpenNotebookClick, disabled }) => {
  return (
    <Button
      shape='round'
      disabled={disabled}
      type='primary-inverse'
      icon={<CodeOutlined />}
      onClick={handleOpenNotebookClick}
    >
      Ver código no Jupyter
    </Button>
  );
};

NotebookOutputs.propTypes = {
  handleOpenNotebookClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

NotebookOutputs.defaultProps = {
  disabled: false,
};

export default NotebookOutputs;
