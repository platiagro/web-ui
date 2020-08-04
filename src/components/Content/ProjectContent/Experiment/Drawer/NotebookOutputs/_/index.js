// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Button } from 'antd';

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
      className='ant-btn-oval'
      type='primary'
    >
      Abrir notebook no Jupyter
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
