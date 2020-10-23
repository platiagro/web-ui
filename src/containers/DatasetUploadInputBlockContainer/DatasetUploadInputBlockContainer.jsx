// REACT LIBS
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// COMPONENTS
import {
  GoogleUploadInputBlock,
  UploadInputBlock,
} from 'components/InputBlocks';

// ACTIONS
import {
  selectDataset,
  startFileDatasetUpload,
  cancelDatasetUpload,
  startGoogleDatasetUpload,
  deleteDatasetRequest,
} from 'store/dataset/actions';
import { fetchDatasetsRequest } from 'store/datasets/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    // start dataset upload
    handleSelectDataset: (dataset, projectId, experimentId) =>
      dispatch(selectDataset(dataset, projectId, experimentId)),
    handleFetchDatasets: () => dispatch(fetchDatasetsRequest()),
    handleCreateGoogleDataset: (file) =>
      dispatch(startGoogleDatasetUpload(file)),
    handleUploadStart: (file) => dispatch(startFileDatasetUpload(file)),
    handleDeleteDataset: (projectId, experimentId) =>
      dispatch(deleteDatasetRequest(projectId, experimentId)),
    handleUploadCancel: () => dispatch(cancelDatasetUpload()),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    datasets: state.datasetsReducer,
    datasetsLoading: state.uiReducer.datasetsList.loading,
    datasetFileName: state.datasetReducer.filename,
    datasetStatus: state.datasetReducer.status,
    uploadProgress: state.datasetReducer.progress,
    isUploading: state.datasetReducer.isUploading,
    loading: state.uiReducer.datasetOperator.loading,
    operatorName: state.operatorReducer.name,
    trainingLoading: state.uiReducer.experimentTraining.loading,
  };
};

const DatasetUploadInputBlockContainer = (props) => {
  const {
    datasets,
    datasetsLoading,
    datasetFileName,
    datasetStatus,
    handleCreateGoogleDataset,
    handleSelectDataset,
    handleFetchDatasets,
    handleUploadCancel,
    handleDeleteDataset,
    handleUploadStart,
    loading,
    operatorName,
    uploadProgress,
    trainingLoading,
    isUploading,
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
  const defaultFileList = isUploading
    ? [
        {
          uid: datasetFileName,
          name: datasetFileName,
          status: datasetStatus,
          percent: uploadProgress,
        },
      ]
    : datasetFileName && [
        {
          uid: datasetFileName,
          name: datasetFileName,
          status: 'done',
        },
      ];

  // check if is google drive dataset
  const isGoogleDrive = operatorName === 'Google Drive';

  // hooks
  // did mount hook
  useEffect(() => {
    // fetching datasets
    handleFetchDatasets();
  }, [handleFetchDatasets]);

  const containerHandleUploadCancel = () =>
    isUploading
      ? handleUploadCancel()
      : handleDeleteDataset(projectId, experimentId);

  const containerHandleSelectDataset = (dataset) =>
    handleSelectDataset(dataset, projectId, experimentId);

  const customUploadHandler = (data) => handleUploadStart(data.file);

  // rendering component
  return isGoogleDrive ? (
    <GoogleUploadInputBlock
      defaultFileList={defaultFileList}
      handleCreateGoogleDataset={handleCreateGoogleDataset}
      handleUploadCancel={containerHandleUploadCancel}
      isDisabled={isDisabled}
      isLoading={isLoading}
      tip={tip}
      title={title}
    />
  ) : (
    <UploadInputBlock
      actionUrl={actionUrl}
      buttonText={buttonText}
      datasets={datasets}
      datasetsLoading={datasetsLoading}
      handleSelectDataset={containerHandleSelectDataset}
      handleUploadCancel={containerHandleUploadCancel}
      isDisabled={isDisabled}
      isLoading={isLoading}
      customRequest={customUploadHandler}
      tip={tip}
      title={title}
      defaultFileList={defaultFileList}
    />
  );
};

DatasetUploadInputBlockContainer.propTypes = {
  /** List of all datasets */
  datasets: PropTypes.array.isRequired,

  /** Datasets list is loading */
  datasetsLoading: PropTypes.bool.isRequired,

  /** Select dataset handler */
  handleSelectDataset: PropTypes.func.isRequired,

  /** Fetch all datasets handler */
  handleFetchDatasets: PropTypes.func.isRequired,

  /** Upload cancel handler */
  handleUploadCancel: PropTypes.func.isRequired,

  /** Delete dataset handler */
  handleDeleteDataset: PropTypes.func.isRequired,

  /** Upload start handler */
  handleUploadStart: PropTypes.func.isRequired,

  /** Dataset is uploading */
  loading: PropTypes.bool.isRequired,

  /** Experiment is running */
  trainingLoading: PropTypes.bool.isRequired,

  /** Dataset file name */
  datasetFileName: PropTypes.string,

  /** Dataset is uploading */
  isUploading: PropTypes.bool,
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
