import {
  getDeploymentId,
  getPredictionId,
  getDataset,
  getPredictionResult,
  getStatus,
} from '../prediction.selectors';

describe('Prediction Selectors', () => {
  const predictionReducer = {
    dataset: 'dataset',
    deploymentId: 'deploymentId',
    predictionId: 'predictionId',
    predictionResult: { ndarray: [1, 2, 3], names: ['a', 'b', 'c'] },
    status: 'done',
  };

  it('should return the deployment id from the reducer state', () => {
    expect(getDeploymentId({ predictionReducer })).toBe(
      predictionReducer.deploymentId
    );
  });

  it('should return the prediction id from the reducer state', () => {
    expect(getPredictionId({ predictionReducer })).toBe(
      predictionReducer.predictionId
    );
  });

  it('should return the dataset from the reducer state', () => {
    expect(getDataset({ predictionReducer })).toBe(predictionReducer.dataset);
  });

  it('should return the prediction result from the reducer state', () => {
    expect(getPredictionResult({ predictionReducer })).toBe(
      predictionReducer.predictionResult
    );
  });

  it('should return the status from the reducer state', () => {
    expect(getStatus({ predictionReducer })).toBe(predictionReducer.status);
  });
});
