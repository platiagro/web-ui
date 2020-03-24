// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// COMPONENTS
import DatasetDrawer from './index';

// ACTIONS
import {
  fetchDatasetColumnsRequest,
  createDatasetRequest,
} from '../../../../../../../store/dataset/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    // fetch dataset columns
    handleFetchDatasetColumns: (datasetName) =>
      dispatch(fetchDatasetColumnsRequest(datasetName)),
    // create dataset
    handleCreateDataset: (formData, projectId, experimentId) =>
      dispatch(createDatasetRequest(formData, projectId, experimentId)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    dataset: state.dataset,
    datasetName: state.experiment.dataset,
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
  datasetName,
  targetColumn,
  handleFetchDatasetColumns,
  handleCreateDataset,
}) => {
  // CONSTANTS
  // getting experiment uuid
  const { projectId, experimentId } = useParams();

  // HOOKS
  // did mount hook
  useEffect(() => {
    // fetching dataset columns
    if (datasetName) handleFetchDatasetColumns(datasetName);
  }, []);

  // HANDLERS
  const createDatasetHandler = (formData) =>
    handleCreateDataset(formData, projectId, experimentId);

  // RENDER
  return (
    <DatasetDrawer
      columns={dataset.columns}
      targetColumnId={targetColumn}
      handleUploadFiles={createDatasetHandler}
    />
  );
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetDrawerContainer);
