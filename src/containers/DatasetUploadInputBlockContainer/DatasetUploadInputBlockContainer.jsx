import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import utils from 'utils';
import { fetchDatasetsRequest } from 'store/datasets/actions';
import {
  UploadInputBlock,
  GoogleUploadInputBlock,
} from 'components/InputBlocks';
import {
  selectDataset,
  cancelDatasetUpload,
  deleteDatasetRequest,
  startFileDatasetUpload,
  startGoogleDatasetUpload,
} from 'store/dataset/actions';

const datasetsSelector = ({ datasetsReducer }) => {
  return datasetsReducer;
};

const datasetsLoadingSelector = ({ uiReducer }) => {
  return uiReducer.datasetsList.loading;
};

const datasetFileNameSelector = ({ datasetReducer }) => {
  return datasetReducer.filename;
};

const datasetStatusSelector = ({ datasetReducer }) => {
  return datasetReducer.status;
};

const uploadProgressSelector = ({ datasetReducer }) => {
  return datasetReducer.progress;
};

const isUploadingSelector = ({ datasetReducer }) => {
  return datasetReducer.isUploading;
};

const isLoadingSelector = ({ uiReducer }) => {
  return uiReducer.datasetOperator.loading;
};

const operatorNameSelector = ({ operatorReducer }) => {
  return operatorReducer.name;
};

const isDisabledSelector = ({ uiReducer }) => {
  return uiReducer.experimentTraining.loading;
};

const operatorsSelector = ({ operatorsReducer }) => {
  return operatorsReducer;
};

const tip = 'Selecione os dados de entrada.';
const title = 'Dados de entrada';
const buttonText = 'Importar';
const actionUrl = `${process.env.REACT_APP_DATASET_API}/datasets`;

const DatasetUploadInputBlockContainer = () => {
  const { projectId, experimentId } = useParams();
  const dispatch = useDispatch();

  const datasets = useSelector(datasetsSelector);
  const datasetsLoading = useSelector(datasetsLoadingSelector);
  const datasetFileName = useSelector(datasetFileNameSelector);
  const datasetStatus = useSelector(datasetStatusSelector);
  const uploadProgress = useSelector(uploadProgressSelector);
  const isUploading = useSelector(isUploadingSelector);
  const isLoading = useSelector(isLoadingSelector);
  const operatorName = useSelector(operatorNameSelector);
  const isDisabled = useSelector(isDisabledSelector);
  const operators = useSelector(operatorsSelector);

  const defaultFileList = useMemo(() => {
    return isUploading
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
  }, [datasetFileName, datasetStatus, isUploading, uploadProgress]);

  const isGoogleDrive = useMemo(() => {
    return operatorName === 'Google Drive';
  }, [operatorName]);

  const experimentIsSucceeded = useMemo(() => {
    return utils.checkExperimentSuccess({ operators });
  }, [operators]);

  const handleUploadCancel = () => {
    if (isUploading) dispatch(cancelDatasetUpload());
    else dispatch(deleteDatasetRequest(projectId, experimentId));
  };

  const handleSelectDataset = (dataset) => {
    dispatch(selectDataset(dataset, projectId, experimentId));
  };

  const handleCustomRequest = (data) => {
    dispatch(startFileDatasetUpload(data.file, projectId, experimentId));
  };

  const handleGoogleDataset = (file) => {
    dispatch(startGoogleDatasetUpload(file, projectId, experimentId));
  };

  useEffect(() => {
    dispatch(fetchDatasetsRequest());
  }, [dispatch]);

  return isGoogleDrive ? (
    <GoogleUploadInputBlock
      tip={tip}
      title={title}
      isLoading={isLoading}
      isDisabled={isDisabled}
      defaultFileList={defaultFileList}
      experimentIsSucceeded={experimentIsSucceeded}
      handleCreateGoogleDataset={handleGoogleDataset}
      handleUploadCancel={handleUploadCancel}
    />
  ) : (
    <UploadInputBlock
      tip={tip}
      title={title}
      datasets={datasets}
      actionUrl={actionUrl}
      isLoading={isLoading}
      isDisabled={isDisabled}
      buttonText={buttonText}
      defaultFileList={defaultFileList}
      datasetsLoading={datasetsLoading}
      customRequest={handleCustomRequest}
      handleSelectDataset={handleSelectDataset}
      experimentIsSucceeded={experimentIsSucceeded}
      handleUploadCancel={handleUploadCancel}
    />
  );
};

export default DatasetUploadInputBlockContainer;
