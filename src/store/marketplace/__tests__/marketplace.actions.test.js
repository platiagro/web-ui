import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';

import marketplaceApi from 'services/MarketplaceApi';
import { ADD_LOADING, REMOVE_LOADING } from 'store/loading';

import * as MARKETPLACE_TYPES from '../marketplace.actionTypes';
import {
  fetchMarketplaceTasks,
  fetchMarketplaceTasksFail,
  fetchMarketplaceTasksSuccess,
  fetchTotalMarketplaceTasks,
  fetchTotalMarketplaceTasksFail,
  fetchTotalMarketplaceTasksSuccess,
} from '../marketplace.actions';

describe('Marketplace Actions', () => {
  const mockStore = configureStore([thunk]);
  const store = mockStore({});

  const mockAxios = new MockAdapter(marketplaceApi.axiosInstance);

  const fakeTasks = [{ uuid: '1' }, { uuid: '2' }, { uuid: '3' }];

  afterEach(() => {
    mockAxios.reset(); // Reset all request handlers
  });

  it('should fetch the marketplaces tasks', async () => {
    mockAxios.onAny().reply(200, fakeTasks);
    await store.dispatch(fetchMarketplaceTasks());
    const actions = store.getActions();

    expect(actions).toEqual(
      expect.arrayContaining([
        {
          type: ADD_LOADING,
          payload: { [MARKETPLACE_TYPES.FETCH_TASKS]: true },
        },
        {
          type: MARKETPLACE_TYPES.FETCH_TASKS_SUCCESS,
          payload: { marketplaceTasks: fakeTasks },
        },
        {
          type: REMOVE_LOADING,
          payload: [MARKETPLACE_TYPES.FETCH_TASKS],
        },
      ])
    );
  });

  it('should handle errors if the fetch marketplace tasks fails', async () => {
    mockAxios.onAny().reply(500, {
      message: 'The error message',
    });

    await store.dispatch(fetchMarketplaceTasks());
    const actions = store.getActions();

    expect(actions).toEqual(
      expect.arrayContaining([
        {
          type: MARKETPLACE_TYPES.FETCH_TASKS_FAIL,
        },
      ])
    );
  });

  it('should return the fetch marketplace tasks fail action', () => {
    expect(fetchMarketplaceTasksFail()).toEqual({
      type: MARKETPLACE_TYPES.FETCH_TASKS_FAIL,
    });
  });

  it('should return the fetch marketplace tasks success action', () => {
    expect(fetchMarketplaceTasksSuccess(fakeTasks)).toEqual({
      type: MARKETPLACE_TYPES.FETCH_TASKS_SUCCESS,
      payload: {
        marketplaceTasks: fakeTasks,
      },
    });
  });

  it('should fetch the total of marketplaces tasks', async () => {
    mockAxios.onAny().reply(200, { total: 25 });
    await store.dispatch(fetchTotalMarketplaceTasks());
    const actions = store.getActions();

    expect(actions).toEqual(
      expect.arrayContaining([
        {
          type: ADD_LOADING,
          payload: { [MARKETPLACE_TYPES.FETCH_TOTAL_TASKS]: true },
        },
        {
          type: MARKETPLACE_TYPES.FETCH_TOTAL_TASKS_SUCCESS,
          payload: { totalMarketplaceTasks: 25 },
        },
        {
          type: REMOVE_LOADING,
          payload: [MARKETPLACE_TYPES.FETCH_TOTAL_TASKS],
        },
      ])
    );
  });

  it('should handle errors if the fetch total marketplace tasks fails', async () => {
    mockAxios.onAny().reply(500, {
      message: 'The error message',
    });

    await store.dispatch(fetchTotalMarketplaceTasks());
    const actions = store.getActions();

    expect(actions).toEqual(
      expect.arrayContaining([
        {
          type: MARKETPLACE_TYPES.FETCH_TOTAL_TASKS_FAIL,
        },
      ])
    );
  });

  it('should return the fetch total marketplace tasks fail action', () => {
    expect(fetchTotalMarketplaceTasksFail()).toEqual({
      type: MARKETPLACE_TYPES.FETCH_TOTAL_TASKS_FAIL,
    });
  });

  it('should return the fetch total marketplace tasks success action', () => {
    expect(fetchTotalMarketplaceTasksSuccess(15)).toEqual({
      type: MARKETPLACE_TYPES.FETCH_TOTAL_TASKS_SUCCESS,
      payload: {
        totalMarketplaceTasks: 15,
      },
    });
  });
});
