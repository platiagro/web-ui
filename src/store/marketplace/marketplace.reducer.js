import * as MARKETPLACE_TASKS from './marketplace.actionTypes';

export const initialState = {
  totalMarketplaceTasks: 0,
  marketplaceTasks: [],
};

export const marketplaceReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case MARKETPLACE_TASKS.FETCH_TOTAL_TASKS_SUCCESS: {
      return {
        ...state,
        totalMarketplaceTasks: action.payload.totalMarketplaceTasks,
      };
    }

    case MARKETPLACE_TASKS.FETCH_TASKS_SUCCESS: {
      return {
        ...state,
        marketplaceTasks: action.payload.marketplaceTasks,
      };
    }

    case MARKETPLACE_TASKS.FETCH_TOTAL_TASKS_FAIL: {
      return {
        ...state,
        totalMarketplaceTasks: 0,
      };
    }

    case MARKETPLACE_TASKS.FETCH_TASKS_FAIL: {
      return {
        ...state,
        marketplaceTasks: [],
      };
    }

    default:
      return state;
  }
};
