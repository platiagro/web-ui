import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { CodeOutlined } from '@ant-design/icons';

const NotebookOutputs = ({ handleOpenNotebookClick }) => {
  return (
    <Button
      onClick={handleOpenNotebookClick}
      icon={<CodeOutlined />}
      type='primary-inverse'
      shape='round'
    >
      Ver código no Jupyter
    </Button>
  );
};

NotebookOutputs.propTypes = {
  handleOpenNotebookClick: PropTypes.func.isRequired,
};

export default NotebookOutputs;
