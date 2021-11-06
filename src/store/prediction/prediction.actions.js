import * as PREDICTION_TYPES from './prediction.actionTypes';

import predictionApi from 'services/PredictionApi';
import { addLoading, removeLoading } from 'store/loading';

const STATUS_DONE = 'done';

/**
 * Create a prediction using a dataset id
 *
 * @param {string} projectId Project Id
 * @param {string} deploymentId Deployment Id
 * @param {string} dataset Dataset file name
 * @returns {Function} Dispatch function
 */
export const createPredictionWithDataset =
  (projectId, deploymentId, dataset) => async (dispatch) => {
    try {
      dispatch(
        addLoading(PREDICTION_TYPES.CREATE_PREDICTION_WITH_DATASET_REQUEST)
      );

      const response = await predictionApi.createPredictionWithDataset(
        projectId,
        deploymentId,
        dataset
      );
      const predictionId = response.data?.uuid;
      const status = response.data?.status;

      dispatch({
        type: PREDICTION_TYPES.CREATE_PREDICTION_WITH_DATASET_SUCCESS,
        payload: {
          predictionId,
          status,
        },
      });
    } catch (e) {
      dispatch({
        type: PREDICTION_TYPES.CREATE_PREDICTION_WITH_DATASET_FAIL,
      });
      dispatch(
        removeLoading(PREDICTION_TYPES.CREATE_PREDICTION_WITH_DATASET_REQUEST)
      );
    }
  };

/**
 * Interrupt prediction
 *
 * @returns {Function} Dispatch function
 */
export const interruptPrediction = () => async (dispatch) => {
  dispatch({ type: PREDICTION_TYPES.INTERRUPT_PREDICTION });

  dispatch(
    removeLoading(PREDICTION_TYPES.CREATE_PREDICTION_WITH_DATASET_REQUEST)
  );
};

/**
 * Function to fetch predictions
 *
 * @param {string} projectId Project Id
 * @param {string} deploymentId Deployment Id
 * @param {string} predictionId Prediction Id
 * @returns {Function} Dispatch function
 */
export const fetchPredictionRequest =
  (projectId, deploymentId, predictionId) => async (dispatch) => {
    try {
      dispatch(addLoading(PREDICTION_TYPES.FETCH_PREDICTION_REQUEST));

      const response = await predictionApi.fetchPrediction(
        projectId,
        deploymentId,
        predictionId
      );

      const status = response.data?.status;

      if (status == STATUS_DONE) {
        const responseBody = response.data.response_body;
        const predictionResult = JSON.parse(responseBody)?.data;

        dispatch({
          type: PREDICTION_TYPES.FETCH_PREDICTION_SUCCESS,
          payload: {
            predictionResult,
            status,
          },
        });

        dispatch(
          removeLoading(PREDICTION_TYPES.CREATE_PREDICTION_WITH_DATASET_REQUEST)
        );
      }
    } catch (e) {
      dispatch({
        type: PREDICTION_TYPES.FETCH_PREDICTION_FAIL,
      });
    } finally {
      dispatch(removeLoading(PREDICTION_TYPES.FETCH_PREDICTION_REQUEST));
    }
  };
