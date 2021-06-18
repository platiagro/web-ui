import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import NotebookOutputs from './index';

const operatorIdSelector = ({ operatorReducer }) => {
  return operatorReducer.uuid;
};

const taskNameSelector = ({ operatorReducer }) => {
  return operatorReducer.name;
};

const statusSelector = ({ operatorReducer }) => {
  return operatorReducer.status;
};

const NotebookOutputsContainer = ({ disabled }) => {
  const { experimentId } = useParams();

  const operatorId = useSelector(operatorIdSelector);
  const taskName = useSelector(taskNameSelector);
  const status = useSelector(statusSelector);

  const handleOpenNotebook = () => {
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

  return (
    <NotebookOutputs
      handleOpenNotebookClick={handleOpenNotebook}
      disabled={disabled}
    />
  );
};

NotebookOutputsContainer.propTypes = {
  disabled: PropTypes.bool,
};

NotebookOutputsContainer.defaultProps = {
  disabled: false,
};

export default NotebookOutputsContainer;
