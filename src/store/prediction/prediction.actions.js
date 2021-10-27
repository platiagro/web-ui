import * as PREDICTION_TYPES from './prediction.actionTypes';

import predictionApi from 'services/PredictionApi';
import { addLoading, removeLoading } from 'store/loading';
import { showError } from 'store/message';

const STATUS_DONE = 'done';

/**
 * Create a prediction using a file
 *
 * @param {string} projectId Project Id
 * @param {string} deploymentId Deployment Id
 * @param {object} file File class instance
 * @returns {Function} Dispatch function
 */
export const createPredictionWithFile =
  (projectId, deploymentId, file) => async (dispatch) => {
    try {
      dispatch(
        addLoading(PREDICTION_TYPES.CREATE_PREDICTION_WITH_FILE_REQUEST)
      );

      const response = await predictionApi.createPredictionWithFile(
        projectId,
        deploymentId,
        file
      );
      const predictionId = response.data?.uuid;
      const status = response.data?.status;

      dispatch({
        type: PREDICTION_TYPES.CREATE_PREDICTION_WITH_FILE_SUCCESS,
        payload: {
          predictionId,
          status,
        },
      });
    } catch (e) {
      dispatch({
        type: PREDICTION_TYPES.CREATE_PREDICTION_WITH_FILE_FAIL,
        payload: {
          deploymentId,
          file,
        },
      });
    }
  };

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
        payload: {
          dataset,
        },
      });
      dispatch(
        removeLoading(PREDICTION_TYPES.CREATE_PREDICTION_WITH_DATASET_REQUEST)
      );
    }
  };

/**
 * Interrupt prediction
 *
 * @param {string} projectId Project Id
 * @param {string} deploymentId Deployment Id
 * @param {string} predictionId Prediction Id
 * @returns {Function} Dispatch function
 */
export const interruptPrediction =
  (projectId, deploymentId, predictionId) => async (dispatch) => {
    try {
      dispatch(addLoading(PREDICTION_TYPES.INTERRUPT_PREDICTION_REQUEST));

      console.log(
        'prediction.actions.js',
        'interruptPrediction',
        projectId,
        deploymentId,
        predictionId
      );

      /* 
      Quando a action createPredictionWithDataset não for mais síncrona é possível
      usar o dispatch(addLoading(...)) para guardar se está testando o fluxo.
      Então na action de teste vocẽ adiciona o addLoading e na action que 
      interrompe o teste você chama o removeLoading, só decida qual 
      actionType usar para isso.
      */

      // TODO: Fazer o request
      await new Promise((resolve) => resolve());

      dispatch({
        type: PREDICTION_TYPES.INTERRUPT_PREDICTION_SUCCESS,
      });
    } catch (e) {
      dispatch(showError(e.message));
      dispatch({ type: PREDICTION_TYPES.INTERRUPT_PREDICTION_FAIL });
    } finally {
      dispatch(removeLoading(PREDICTION_TYPES.INTERRUPT_PREDICTION_REQUEST));
    }
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
        dispatch(
          removeLoading(PREDICTION_TYPES.CREATE_PREDICTION_WITH_FILE_REQUEST)
        );
      }
    } catch (e) {
      dispatch({
        type: PREDICTION_TYPES.FETCH_PREDICTION_FAIL,
        payload: {},
      });
    } finally {
      dispatch(removeLoading(PREDICTION_TYPES.FETCH_PREDICTION_REQUEST));
    }
  };
