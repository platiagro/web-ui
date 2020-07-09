// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Button } from 'antd';

/**
 * Notebook Outputs.
 * This component is responsible for displaying a button that opens Jupyter.
 */
const NotebookOutputs = ({ handleOpenNotebookClick }) => {
  return (
    // div container
    <div style={{ textAlign: 'center' }}>
      <Button
        onClick={handleOpenNotebookClick}
        className='ant-btn-oval'
        type='primary'
      >
        Abrir notebook no Jupyter
      </Button>
    </div>
  );
};

// PROP TYPES
NotebookOutputs.propTypes = {
  /** open notebook button click handler */
  handleOpenNotebookClick: PropTypes.func.isRequired,
};

// EXPORT
export default NotebookOutputs;
