import * as MARKETPLACE_TYPES from '../marketplace.actionTypes';
import { initialState, marketplaceReducer } from '../marketplace.reducer';

describe('Deployment Logs Reducer', () => {
  const fakeTasks = [{ uuid: '1' }, { uuid: '2' }, { uuid: '3' }];

  it('should set the total of marketplace tasks', () => {
    const action = {
      type: MARKETPLACE_TYPES.FETCH_TOTAL_TASKS_SUCCESS,
      payload: {
        totalMarketplaceTasks: 5,
      },
    };

    const newState = marketplaceReducer(initialState, action);
    expect(newState.totalMarketplaceTasks).toBe(5);
  });

  it('should set the marketplace tasks array', () => {
    const action = {
      type: MARKETPLACE_TYPES.FETCH_TASKS_SUCCESS,
      payload: {
        marketplaceTasks: fakeTasks,
      },
    };

    const newState = marketplaceReducer(initialState, action);
    expect(newState.marketplaceTasks).toEqual(fakeTasks);
  });

  it('should clear the total of marketplace tasks', () => {
    const action = {
      type: MARKETPLACE_TYPES.FETCH_TOTAL_TASKS_FAIL,
    };

    const newState = marketplaceReducer(
      { ...initialState, totalMarketplaceTasks: 15 },
      action
    );

    expect(newState.totalMarketplaceTasks).toBe(0);
  });

  it('should clear the marketplace tasks array', () => {
    const action = {
      type: MARKETPLACE_TYPES.FETCH_TASKS_FAIL,
    };

    const newState = marketplaceReducer(
      { ...initialState, marketplaceTasks: fakeTasks },
      action
    );

    expect(newState.marketplaceTasks).toHaveLength(0);
  });

  it('should not modify the state', () => {
    const action = { type: 'A_RANDOM_TYPE' };
    const newState = marketplaceReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
