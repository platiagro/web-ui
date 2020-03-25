// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// COMPONENTS
import DatasetDrawer from './index';

// ACTIONS
import { createDatasetRequest } from '../../../../../../../store/dataset/actions';
import { setTargetColumnRequest } from '../../../../../../../store/experiment/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    // create dataset
    handleCreateDataset: (formData, projectId, experimentId) =>
      dispatch(createDatasetRequest(formData, projectId, experimentId)),
    // set experiment target
    handleSetTarget: (formData, projectId, targetColumnName) =>
      dispatch(setTargetColumnRequest(formData, projectId, targetColumnName)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    dataset: state.dataset,
    targetColumn: state.experiment.target,
  };
};

/**
 * DatasetDrawer Container.
 * This component is responsible for create a logic container for drawer with
 * redux.
 */
const DatasetDrawerContainer = ({
  dataset,
  targetColumn,
  handleCreateDataset,
  handleSetTarget,
}) => {
  // CONSTANTS
  // getting experiment uuid
  const { projectId, experimentId } = useParams();

  // HANDLERS
  // create dataset
  const createDatasetHandler = (formData) =>
    handleCreateDataset(formData, projectId, experimentId);
  // set target
  const setTargetHandler = (targetColumnName) =>
    handleSetTarget(projectId, experimentId, targetColumnName);

  // RENDER
  return (
    <DatasetDrawer
      columns={dataset.columns}
      targetColumnId={targetColumn}
      handleUploadFiles={createDatasetHandler}
      handleSetTarget={setTargetHandler}
    />
  );
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetDrawerContainer);
