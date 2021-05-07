// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Button } from 'antd';

// ANTD ICON
import { CodeOutlined } from '@ant-design/icons';

// button shape
const icon = <CodeOutlined />;

/**
 * Notebook Outputs.
 * This component is responsible for displaying a button that opens Jupyter.
 *
 * @param props
 */
const NotebookOutputs = (props) => {
  // destructuring props
  const { handleOpenNotebookClick } = props;

  // rendering component
  return (
    <Button
      onClick={handleOpenNotebookClick}
      icon={icon}
      shape='round'
      type='primary-inverse'
    >
      Ver código no Jupyter
    </Button>
  );
};

// PROP TYPES
NotebookOutputs.propTypes = {
  /** open notebook button click handler */
  handleOpenNotebookClick: PropTypes.func.isRequired,
};

// EXPORT
export default NotebookOutputs;
