export const getDeploymentId = ({ predictionReducer }) => {
  return predictionReducer.deploymentId;
};

export const getPredictionId = ({ predictionReducer }) => {
  return predictionReducer.predictionId;
};

export const getFile = ({ predictionReducer }) => {
  return predictionReducer.file;
};

export const getDataset = ({ predictionReducer }) => {
  return predictionReducer.dataset;
};

export const getPredictionResult = ({ predictionReducer }) => {
  return predictionReducer.predictionResult;
};

export const getStatus = ({ predictionReducer }) => {
  return predictionReducer.status;
};
