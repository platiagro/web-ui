// REACT LIBS
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// COMPONENTS
import { UploadInputBlock } from 'components/InputBlocks';

// ACTIONS
import {
  getDatasetRequest,
  startDatasetUpload,
  cancelDatasetUpload,
  datasetUploadFail,
  datasetUploadSuccess,
  deleteDatasetRequest,
} from 'store/dataset/actions';
import { fetchDatasetsRequest } from 'store/datasets/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    // start dataset upload
    handleFetchDataset: (e) => dispatch(getDatasetRequest(e)),
    handleFetchDatasets: () => dispatch(fetchDatasetsRequest()),
    handleUploadStart: () => dispatch(startDatasetUpload()),
    handleDeleteDataset: (projectId, experimentId) =>
      dispatch(deleteDatasetRequest(projectId, experimentId)),
    handleUploadCancel: () => dispatch(cancelDatasetUpload()),
    handleUploadFail: () => dispatch(datasetUploadFail()),
    handleUploadSuccess: (dataset, projectId, experimentId) =>
      dispatch(datasetUploadSuccess(dataset, projectId, experimentId)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    datasets: state.datasetsReducer,
    loading: state.uiReducer.datasetOperator.loading,
    trainingLoading: state.uiReducer.experimentTraining.loading,
    datasetFileName: state.datasetReducer.filename,
  };
};

const DatasetUploadInputBlockContainer = (props) => {
  // destructuring props
  const {
    datasets,
    handleFetchDataset,
    handleFetchDatasets,
    handleUploadCancel,
    handleDeleteDataset,
    handleUploadFail,
    handleUploadStart,
    handleUploadSuccess,
    loading,
    trainingLoading,
    datasetFileName,
  } = props;

  // CONSTANTS
  // project id and experiment id
  const { projectId, experimentId } = useParams();

  // tip
  const tip = 'Selecione os dados de entrada.';

  // title
  const title = 'Dados de entrada';

  // button text
  const buttonText = 'Importar';

  // action url
  const actionUrl = `${process.env.REACT_APP_DATASET_API}/datasets`;

  // upload is disabled
  const isDisabled = trainingLoading;

  // upload is loading
  const isLoading = loading;

  // default file list
  const defaultFileList = datasetFileName
    ? [
        {
          uid: datasetFileName,
          name: datasetFileName,
          status: 'done',
        },
      ]
    : undefined;

  // hooks
  // did mount hook
  useEffect(() => {
    // fetching datasets
    handleFetchDatasets();
  }, [handleFetchDatasets]);

  // handlers
  const containerHandleUploadSuccess = (dataset) =>
    handleUploadSuccess(dataset, projectId, experimentId);

  const containerHandleUploadCancel = () =>
    datasetFileName
      ? handleDeleteDataset(projectId, experimentId)
      : handleUploadCancel();

  // rendering component
  return (
    <UploadInputBlock
      actionUrl={actionUrl}
      buttonText={buttonText}
      datasets={datasets}
      handleFetchDataset={handleFetchDataset}
      handleUploadCancel={containerHandleUploadCancel}
      handleUploadFail={handleUploadFail}
      handleUploadStart={handleUploadStart}
      handleUploadSuccess={containerHandleUploadSuccess}
      isDisabled={isDisabled}
      isLoading={isLoading}
      tip={tip}
      title={title}
      defaultFileList={defaultFileList}
    />
  );
};

DatasetUploadInputBlockContainer.propTypes = {
  /** List of all datasets */
  datasets: PropTypes.array.isRequired,

  /** Fetch dataset by name handler */
  handleFetchDataset: PropTypes.func.isRequired,

  /** Fetch all datasets handler */
  handleFetchDatasets: PropTypes.func.isRequired,

  /** Upload cancel handler */
  handleUploadCancel: PropTypes.func.isRequired,

  /** Delete dataset handler */
  handleDeleteDataset: PropTypes.func.isRequired,

  /** Upload fail handler */
  handleUploadFail: PropTypes.func.isRequired,

  /** Upload start handler */
  handleUploadStart: PropTypes.func.isRequired,

  /** Upload success handler */
  handleUploadSuccess: PropTypes.func.isRequired,

  /** Dataset is uploading */
  loading: PropTypes.bool.isRequired,

  /** Experiment is running */
  trainingLoading: PropTypes.bool.isRequired,

  /** Dataset file name */
  datasetFileName: PropTypes.string,
};

DatasetUploadInputBlockContainer.defaultProps = {
  /** Dataset file name */
  datasetFileName: undefined,
};

// EXPORT DEFAULT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetUploadInputBlockContainer);
