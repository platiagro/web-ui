import * as TEST_DEPLOYMENT_TYPES from './testDeployment.actionTypes';

import { showError } from 'store/message';
import deploymentsApi from 'services/DeploymentsApi';
import { addLoading, removeLoading } from 'store/loading';

/**
 * Test deployment with a file
 *
 * @param {string} projectId Project Id
 * @param {string} deploymentId Deployment Id
 * @param {object} file File class instance
 * @returns {Function} Dispatch function
 */
export const testDeploymentWithFile =
  (projectId, deploymentId, file) => async (dispatch) => {
    try {
      dispatch(
        addLoading(TEST_DEPLOYMENT_TYPES.TEST_DEPLOYMENT_WITH_FILE_REQUEST)
      );

      const response = await deploymentsApi.testDeploymentWithFile(
        projectId,
        deploymentId,
        file
      );

      const hasData = 'data' in response.data;
      const testResult = hasData ? response.data.data : response.data;

      dispatch({
        type: TEST_DEPLOYMENT_TYPES.TEST_DEPLOYMENT_WITH_FILE_SUCCESS,
        payload: {
          testResult,
        },
      });
    } catch (e) {
      dispatch({
        type: TEST_DEPLOYMENT_TYPES.TEST_DEPLOYMENT_WITH_FILE_FAIL,
        payload: {
          deploymentId,
          file,
        },
      });
    } finally {
      dispatch(
        removeLoading(TEST_DEPLOYMENT_TYPES.TEST_DEPLOYMENT_WITH_FILE_REQUEST)
      );
    }
  };

/**
 * Test deployment with a uploaded dataset
 *
 * @param {string} projectId Project Id
 * @param {string} deploymentId Deployment Id
 * @param {string} dataset Dataset file name
 * @returns {Function} Dispatch function
 */
export const testDeploymentWithDataset =
  (projectId, deploymentId, dataset) => async (dispatch) => {
    try {
      dispatch(
        addLoading(TEST_DEPLOYMENT_TYPES.TEST_DEPLOYMENT_WITH_DATASET_REQUEST)
      );

      const response = await deploymentsApi.testDeploymentWithDataset(
        projectId,
        deploymentId,
        dataset
      );

      const hasData = 'data' in response.data;
      const testResult = hasData ? response.data.data : response.data;

      dispatch({
        type: TEST_DEPLOYMENT_TYPES.TEST_DEPLOYMENT_WITH_DATASET_SUCCESS,
        payload: {
          testResult,
        },
      });
    } catch (e) {
      dispatch({
        type: TEST_DEPLOYMENT_TYPES.TEST_DEPLOYMENT_WITH_DATASET_FAIL,
        payload: {
          dataset,
        },
      });
    } finally {
      dispatch(
        removeLoading(
          TEST_DEPLOYMENT_TYPES.TEST_DEPLOYMENT_WITH_DATASET_REQUEST
        )
      );
    }
  };

/**
 * Interrupt deployment test
 *
 * @param {string} projectId Project Id
 * @param {string} deploymentId Deployment Id
 * @returns {Function} Dispatch function
 */
export const interruptDeploymentTest =
  (projectId, deploymentId) => async (dispatch) => {
    try {
      dispatch(
        addLoading(TEST_DEPLOYMENT_TYPES.INTERRUPT_DEPLOYMENT_TEST_REQUEST)
      );

      console.log(
        'testDeployment.actions.js',
        'interruptDeploymentTest',
        projectId,
        deploymentId
      );

      /* 
      Quando a action testDeploymentWithDataset não for mais síncrona é possível
      usar o dispatch(addLoading(...)) para guardar se está testando o fluxo.
      Então na action de teste vocẽ adiciona o addLoading e na action que 
      interrompe o teste você chama o removeLoading, só decida qual 
      actionType usar para isso.
      */

      // TODO: Fazer o request
      await new Promise.resolve({});

      dispatch({
        type: TEST_DEPLOYMENT_TYPES.INTERRUPT_DEPLOYMENT_TEST_SUCCESS,
      });
    } catch (e) {
      dispatch(showError(e.message));
      dispatch({ type: TEST_DEPLOYMENT_TYPES.INTERRUPT_DEPLOYMENT_TEST_FAIL });
    } finally {
      dispatch(
        removeLoading(TEST_DEPLOYMENT_TYPES.INTERRUPT_DEPLOYMENT_TEST_REQUEST)
      );
    }
  };
