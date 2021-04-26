import { ADD_LOADING, REMOVE_LOADING } from './loading.actionTypes';

export const addLoading = (...keys) => {
  const loadingToAdd = {};

  keys.forEach((key) => {
    loadingToAdd[key] = true;
  });

  return {
    type: ADD_LOADING,
    payload: loadingToAdd,
  };
};

export const removeLoading = (...keys) => {
  return {
    type: REMOVE_LOADING,
    payload: keys,
  };
};
