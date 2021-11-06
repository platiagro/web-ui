import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';

import predictionApi from 'services/PredictionApi';

import * as PREDICTION_TYPES from '../prediction.actionTypes';
import { ADD_LOADING, REMOVE_LOADING } from 'store/loading';

import {
  createPredictionWithDataset,
  fetchPredictionRequest,
  interruptPrediction,
} from '../prediction.actions';

describe('Prediction Action', () => {
  const mockStore = configureStore([thunk]);
  const store = mockStore({});

  const predictionMockAxios = new MockAdapter(predictionApi.axiosInstance);

  beforeEach(() => {
    store.clearActions();
    predictionMockAxios.reset();
  });

  const fakePredictionInProgress = {
    uuid: 'predictionId',
    status: 'started',
    deployment_id: 'deploymentId',
  };

  const requestBody = { data: { ndarray: [[1, 2]], names: ['a', 'b'] } };
  const responseBody = {
    data: { ndarray: [[1, 2, 3]], names: ['a', 'b', 'c'] },
  };

  const fakePredictionDone = {
    uuid: 'predictionId',
    status: 'done',
    deployment_id: 'deploymentId',
    request_body: JSON.stringify(requestBody),
    response_body: JSON.stringify(responseBody),
  };

  it('should create an async action to create a prediction', async () => {
    predictionMockAxios.onPost().reply(200, fakePredictionInProgress);

    await store.dispatch(
      createPredictionWithDataset('projectId', 'deploymentId', 'dataset')
    );

    const actions = store.getActions();

    expect(actions).toEqual([
      {
        type: ADD_LOADING,
        payload: {
          [PREDICTION_TYPES.CREATE_PREDICTION_WITH_DATASET_REQUEST]: true,
        },
      },
      {
        type: PREDICTION_TYPES.CREATE_PREDICTION_WITH_DATASET_SUCCESS,
        payload: {
          predictionId: 'predictionId',
          status: 'started',
        },
      },
    ]);
  });

  it('should handle errors in create prediction async action', async () => {
    predictionMockAxios.onPost().reply(500, { message: 'error message' });

    await store.dispatch(
      createPredictionWithDataset('projectId', 'deploymentId', 'dataset')
    );

    const actions = store.getActions();

    expect(actions).toEqual(
      expect.arrayContaining([
        {
          type: ADD_LOADING,
          payload: {
            [PREDICTION_TYPES.CREATE_PREDICTION_WITH_DATASET_REQUEST]: true,
          },
        },
        {
          type: PREDICTION_TYPES.CREATE_PREDICTION_WITH_DATASET_FAIL,
        },
        {
          type: REMOVE_LOADING,
          payload: [PREDICTION_TYPES.CREATE_PREDICTION_WITH_DATASET_REQUEST],
        },
      ])
    );
  });

  it('should create the fetch prediction request action', async () => {
    predictionMockAxios.onGet().reply(200, fakePredictionDone);

    await store.dispatch(
      fetchPredictionRequest('projectId', 'deploymentId', 'predictionId')
    );
    const actions = store.getActions();

    expect(actions).toEqual([
      {
        type: ADD_LOADING,
        payload: {
          [PREDICTION_TYPES.FETCH_PREDICTION_REQUEST]: true,
        },
      },
      {
        type: PREDICTION_TYPES.FETCH_PREDICTION_SUCCESS,
        payload: {
          predictionResult: responseBody.data,
          status: 'done',
        },
      },
      {
        type: REMOVE_LOADING,
        payload: [PREDICTION_TYPES.CREATE_PREDICTION_WITH_DATASET_REQUEST],
      },
      {
        type: REMOVE_LOADING,
        payload: [PREDICTION_TYPES.FETCH_PREDICTION_REQUEST],
      },
    ]);
  });

  it('should handle errors in fetch prediction async action', async () => {
    predictionMockAxios.onGet().reply(500, { message: 'error message' });

    await store.dispatch(
      fetchPredictionRequest('projectId', 'deploymentId', 'predictionId')
    );

    const actions = store.getActions();

    expect(actions).toEqual(
      expect.arrayContaining([
        {
          type: ADD_LOADING,
          payload: {
            [PREDICTION_TYPES.FETCH_PREDICTION_REQUEST]: true,
          },
        },
        {
          type: PREDICTION_TYPES.FETCH_PREDICTION_FAIL,
        },
        {
          type: REMOVE_LOADING,
          payload: [PREDICTION_TYPES.FETCH_PREDICTION_REQUEST],
        },
      ])
    );
  });

  it('should create the interrupt prediction action', async () => {
    const actions = store.getActions();

    await store.dispatch(interruptPrediction());

    expect(actions).toEqual(
      expect.arrayContaining([
        {
          type: PREDICTION_TYPES.INTERRUPT_PREDICTION,
        },
        {
          type: REMOVE_LOADING,
          payload: [PREDICTION_TYPES.CREATE_PREDICTION_WITH_DATASET_REQUEST],
        },
      ])
    );
  });
});
