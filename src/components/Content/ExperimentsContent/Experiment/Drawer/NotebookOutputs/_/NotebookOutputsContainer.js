// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// COMPONENTS
import NotebookOutputs from './index';

// STATES
const mapStateToProps = (state) => {
  return {
    operatorId: state.operatorReducer.uuid,
    taskName: state.operatorReducer.name,
    status: state.operatorReducer.status,
  };
};

/**
 * Notebook Outputs Container.
 * This component is responsible for create a logic container for notebook button
 * with redux.
 */
const NotebookOutputsContainer = ({ operatorId, taskName, status }) => {
  // CONSTANTS
  // getting experiment uuid
  const { experimentId } = useParams();

  // HANDLERS
  const openNotebook = () => {
    if (status) {
      window.open(
        `/jupyterlab/tree/experiments/${experimentId}/operators/${operatorId}/?reset&open=Experiment.ipynb`
      );
    } else {
      window.open(
        `/jupyterlab/tree/tasks/${taskName}/?reset&open=Experiment.ipynb`
      );
    }
  };

  // RENDER
  return <NotebookOutputs handleOpenNotebookClick={openNotebook} />;
};

// EXPORT
export default connect(mapStateToProps)(NotebookOutputsContainer);
