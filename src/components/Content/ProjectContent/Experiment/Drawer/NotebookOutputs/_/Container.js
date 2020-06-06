// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// COMPONENTS
import NotebookOutputs from './index';

// STATES
const mapStateToProps = (state) => {
  return {
    operatorId: state.operator.uuid,
    componentId: state.operator.componentId,
    status: state.operator.status,
  };
};

/**
 * Notebook Outputs Container.
 * This component is responsible for create a logic container for notebook button
 * with redux.
 */
const NotebookOutputsContainer = ({ operatorId, componentId, status }) => {
  // CONSTANTS
  // getting experiment uuid
  const { experimentId } = useParams();

  // HANDLERS
  const openNotebook = () => {
    const jupyterDomain =
      process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_MAIN_DOMAIN
        : '';

    if (status) {
      window.open(
        `${jupyterDomain}/notebook/anonymous/server/lab/tree/experiments/${experimentId}/operators/${operatorId}/?reset&open=Experiment.ipynb`
      );
    } else {
      window.open(
        `${jupyterDomain}/notebook/anonymous/server/lab/tree/components/${componentId}/?reset&open=Experiment.ipynb`
      );
    }
  };

  // RENDER
  return <NotebookOutputs handleOpenNotebookClick={openNotebook} />;
};

// EXPORT
export default connect(mapStateToProps)(NotebookOutputsContainer);
