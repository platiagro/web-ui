import { v4 as uuidv4 } from 'uuid';

// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import tasksApi from 'services/TasksApi';

// UI ACTIONS
import { changeLoadingCompareResultsModal } from 'store/ui/actions';

// UTILS
import utils from 'utils';

const changeAddLoader = (addIsLoading) => {
  return {
    type: actionTypes.ADD_COMPARE_RESULT_LOADER,
    addIsLoading: addIsLoading,
  };
};

/**
 * Function to add compare result and dispatch to reducer
 */
export const addCompareResult = () => {
  return async (dispatch) => {
    dispatch(changeAddLoader(true));

    await utils.sleep(2000);

    dispatch(changeAddLoader(false));

    dispatch({
      type: actionTypes.ADD_COMPARE_RESULT,
      compareResult: {
        uuid: uuidv4(),
        projectId: '',
        experimentId: '',
        operatorId: '',
        runId: '',
        createdAt: '2020-10-07T12:13:44',
      },
    });
  };
};

const changeDeleteLoader = (deleteIsLoading) => {
  return {
    type: actionTypes.DELETE_COMPARE_RESULT_LOADER,
    deleteIsLoading: deleteIsLoading,
  };
};

/**
 * Function to delete compare result and dispatch to reducer
 *
 * @param {string} id
 */
export const deleteCompareResult = (id) => {
  return async (dispatch) => {
    dispatch(changeDeleteLoader(true));

    await utils.sleep(2000);

    dispatch(changeDeleteLoader(false));

    dispatch({
      type: actionTypes.DELETE_COMPARE_RESULT,
      id,
    });
  };
};

/**
 * Function to fetch compare results and dispatch to reducer
 */
export const fetchCompareResults = () => {
  return async (dispatch) => {
    dispatch(changeLoadingCompareResultsModal(true));

    await utils.sleep(1000);

    dispatch(changeLoadingCompareResultsModal(false));
    dispatch({
      type: actionTypes.FETCH_EXPERIMENTS_TRAINING_HISTORY,
      experimentsTrainingHistory: {
        'baff2d2f-09c6-406e-9132-3a1adc134fa4': [
          {
            uuid: 'ec2f9165-d8c5-4d3c-97f1-34cd4e227f5e',
            projectId: 'c0051e40-ee17-4c8b-9f8a-79125071616c',
            runId: 'e26f2a69-1896-4234-9976-dc6bb3c4b66e',
            createdAt: '2020-10-09T13:35:06',
            details: [
              {
                operatorId: 'operator1',
                taskId: 'aeceee55-fc47-4a1f-ac2c-36aea4c395b7',
                parameters: [
                  {
                    name: 'target',
                    value: 'Species',
                  },
                ],
              },
              {
                operatorId: 'operator2',
                taskId: 'ca7fa5c8-a3ed-437a-bf74-1cd89d0ae164',
                parameters: [
                  {
                    name: 'target',
                    value: 'Species',
                  },
                ],
              },
              ,
              {
                operatorId: 'operator3',
                taskId: 'a4ddf832-a55c-4da6-9ed9-b154505c3f3a',
                parameters: [
                  {
                    name: 'target',
                    value: 'Species',
                  },
                ],
              },
            ],
          },
        ],
        'c10fb5e1-563c-4588-8634-8f81523b3c77': [
          {
            uuid: 'ec2f9165-d8c5-4d3c-97f1-34cd4e227f5e',
            projectId: 'c0051e40-ee17-4c8b-9f8a-79125071616c',
            runId: 'e26f2a69-1896-4234-9976-dc6bb3c4b66e',
            createdAt: '2020-10-09T13:35:06',
            details: [
              {
                operatorId: 'a03bf11e-7c71-498e-b485-d3d3eb6b7d80',
                taskId: 'aeceee55-fc47-4a1f-ac2c-36aea4c395b7',
                parameters: [
                  {
                    name: 'target',
                    value: 'Species',
                  },
                ],
              },
            ],
          },
        ],
      },
    });
    dispatch({
      type: actionTypes.FETCH_COMPARE_RESULTS,
      compareResults: [
        {
          uuid: 'a',
          projectId: '',
          experimentId: '',
          operatorId: '',
          runId: '',
          createdAt: '2020-10-07T12:13:44',
        },
        {
          uuid: 'b',
          projectId: '',
          experimentId: '',
          operatorId: '',
          runId: '',
          createdAt: '2020-10-07T12:13:44',
        },
      ],
    });
  };
};

/**
 * Function to update compare result and dispatch to reducer
 */
export const updateCompareResult = (compareResult) => {
  return async (dispatch) => {
    await utils.sleep(1000);
    dispatch({
      type: actionTypes.UPDATE_COMPARE_RESULT,
      compareResult: compareResult,
    });
  };
};
