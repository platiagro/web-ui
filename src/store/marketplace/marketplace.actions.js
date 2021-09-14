import utils from 'utils';
import { showError } from 'store/message';
import marketplaceApi from 'services/MarketplaceApi';
import { addLoading, removeLoading } from 'store/loading';

import * as MARKETPLACE_TYPES from './marketplace.actionTypes';

/**
 * Return the fetch total marketplace success action
 *
 * @param {number} totalMarketplaceTasks Total marketplace tasks
 * @returns {object} Action
 */
export const fetchTotalMarketplaceTasksSuccess = (totalMarketplaceTasks) => {
  return {
    type: MARKETPLACE_TYPES.FETCH_TOTAL_TASKS_SUCCESS,
    payload: {
      totalMarketplaceTasks,
    },
  };
};

/**
 * Return the fetch total marketplace fail action
 *
 * @returns {object} Action
 */
export const fetchTotalMarketplaceTasksFail = () => {
  return {
    type: MARKETPLACE_TYPES.FETCH_TOTAL_TASKS_FAIL,
  };
};

/**
 * Fetch the total of marketplace tasks
 *
 * @returns {Function} Dispatch function
 */
export const fetchTotalMarketplaceTasks = () => async (dispatch) => {
  try {
    dispatch(addLoading(MARKETPLACE_TYPES.FETCH_TOTAL_TASKS));
    const response = await marketplaceApi.fetchTotalMarketplaceTasks();
    dispatch(fetchTotalMarketplaceTasksSuccess(response?.data?.total || 0));
  } catch (e) {
    dispatch(fetchTotalMarketplaceTasksFail());
    dispatch(showError(utils.getErrorMessage(e)));
  } finally {
    dispatch(removeLoading(MARKETPLACE_TYPES.FETCH_TOTAL_TASKS));
  }
};

/**
 * Return fetch marketplace tasks success action
 *
 * @param {Array} marketplaceTasks Marketplace tasks
 * @returns {object} Action
 */
export const fetchMarketplaceTasksSuccess = (marketplaceTasks) => {
  return {
    type: MARKETPLACE_TYPES.FETCH_TASKS_SUCCESS,
    payload: {
      marketplaceTasks,
    },
  };
};

/**
 * Return fetch marketplace tasks fail action
 *
 * @returns {object} Action
 */
export const fetchMarketplaceTasksFail = () => {
  return {
    type: MARKETPLACE_TYPES.FETCH_TASKS_FAIL,
  };
};

/**
 * Fetch marketplace tasks
 *
 * @param {object} filter Filter
 * @returns {Function} Dispatch function
 */
export const fetchMarketplaceTasks = (filter) => async (dispatch) => {
  try {
    dispatch(addLoading(MARKETPLACE_TYPES.FETCH_TASKS));
    const response = await marketplaceApi.fetchMarketplaceTasks(filter);
    dispatch(fetchMarketplaceTasksSuccess(response?.data || []));
  } catch (e) {
    dispatch(fetchMarketplaceTasksFail());
    dispatch(showError(utils.getErrorMessage(e)));
  } finally {
    dispatch(removeLoading(MARKETPLACE_TYPES.FETCH_TASKS));
  }
};
