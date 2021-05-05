import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  GoogleUploadInputBlock,
  UploadInputBlock,
} from 'components/InputBlocks';

import {
  selectDataset,
  startFileDatasetUpload,
  cancelDatasetUpload,
  startGoogleDatasetUpload,
  deleteDatasetRequest,
} from 'store/dataset/actions';

import { fetchDatasetsRequest } from 'store/datasets/actions';

const DatasetUploadInputBlockContainer = () => {
  const { projectId, experimentId } = useParams();
  const dispatch = useDispatch();

  const tip = 'Selecione os dados de entrada.';
  const title = 'Dados de entrada';
  const buttonText = 'Importar';
  const actionUrl = `${process.env.REACT_APP_DATASET_API}/datasets`;

  // TODO: Criar seletores
  /* eslint-disable */
  const datasets = useSelector((state) => state.datasetsReducer);
  const datasetsLoading = useSelector(
    (state) => state.uiReducer.datasetsList.loading
  );
  const datasetFileName = useSelector((state) => state.datasetReducer.filename);
  const datasetStatus = useSelector((state) => state.datasetReducer.status);
  const uploadProgress = useSelector((state) => state.datasetReducer.progress);
  const isUploading = useSelector((state) => state.datasetReducer.isUploading);
  const isLoading = useSelector(
    (state) => state.uiReducer.datasetOperator.loading
  );
  const operatorName = useSelector((state) => state.operatorReducer.name);
  const isDisabled = useSelector(
    (state) => state.uiReducer.experimentTraining.loading
  );
  /* eslint-enable */

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
  const isGoogleDrive = operatorName === 'Google Drive';

  useEffect(() => {
    dispatch(fetchDatasetsRequest());
  }, [dispatch]);

  const containerHandleUploadCancel = () =>
    isUploading
      ? dispatch(cancelDatasetUpload())
      : dispatch(deleteDatasetRequest(projectId, experimentId));

  const containerHandleSelectDataset = (dataset) =>
    dispatch(selectDataset(dataset, projectId, experimentId));

  const customUploadHandler = (data) =>
    dispatch(startFileDatasetUpload(data.file, projectId, experimentId));

  const handleGoogleDataset = (file) =>
    dispatch(startGoogleDatasetUpload(file, projectId, experimentId));

  // rendering component
  return isGoogleDrive ? (
    <GoogleUploadInputBlock
      defaultFileList={defaultFileList}
      handleCreateGoogleDataset={handleGoogleDataset}
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

// EXPORT DEFAULT
export default DatasetUploadInputBlockContainer;
