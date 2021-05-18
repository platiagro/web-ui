export const getDeploymentId = ({ testDeploymentReducer }) => {
  return testDeploymentReducer.deploymentId;
};

export const getFile = ({ testDeploymentReducer }) => {
  return testDeploymentReducer.file;
};

export const getDataset = ({ testDeploymentReducer }) => {
  return testDeploymentReducer.dataset;
};

export const getTestResult = ({ testDeploymentReducer }) => {
  return testDeploymentReducer.testResult;
};
