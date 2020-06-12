// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// COMPONENTS
import DatasetDrawer from './index';

// ACTIONS
import {
  createDatasetRequest,
  updateDatasetColumnRequest,
} from '../../../../../../../store/dataset/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    // create dataset
    handleCreateDataset: (formData, projectId, experimentId) =>
      dispatch(createDatasetRequest(formData, projectId, experimentId)),
    // update dataset column
    handleUpdateDatasetColumn: (datasetName, columnName, columnNewType) =>
      dispatch(
        updateDatasetColumnRequest(datasetName, columnName, columnNewType)
      ),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    dataset: state.dataset,
    datasetName: state.experiment.dataset,
    loading: state.ui.datasetOperator.loading,
    trainingSucceeded: state.experiment.succeeded,
    trainingLoading: state.ui.experimentTraining.loading,
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
  loading,
  trainingLoading,
  handleCreateDataset,
  handleUpdateDatasetColumn,
  trainingSucceeded,
}) => {
  // CONSTANTS
  // getting experiment uuid
  const { projectId, experimentId } = useParams();

  // HANDLERS
  // create dataset
  const createDatasetHandler = (formData) =>
    handleCreateDataset(formData, projectId, experimentId);
  // update dataset column
  const updateDatasetColumnHandler = (columnName, columnNewValue) =>
    handleUpdateDatasetColumn(datasetName, columnName, columnNewValue);

  // RENDER
  return (
    <DatasetDrawer
      columns={dataset.columns}
      handleUploadFiles={createDatasetHandler}
      handleSetColumnType={updateDatasetColumnHandler}
      loading={loading}
      trainingLoading={trainingLoading}
      trainingSucceeded={trainingSucceeded}
    />
  );
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetDrawerContainer);
