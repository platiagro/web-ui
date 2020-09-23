// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';
import datasetActionTypes from '../dataset/actionTypes';

// INITIAL STATE
const initialState = [];

/**
 * datasets reducer
 */

const datasetsReducer = (state = initialState, action = undefined) => {
  switch (action.type) {
    //reset initial fetch of datasets
    case actionTypes.CLEAR_ALL_DATASETS:
      return [];
    // SUCCESS
    // datasets
    // fetch datasets success
    case actionTypes.FETCH_DATASETS_SUCCESS:
      return [...action.datasets];

    // dataset
    // create dataset success
    case datasetActionTypes.CREATE_DATASET_SUCCESS:
      return [...state, { name: action.payload.name }];

    // // // // // // //

    // FAIL
    // datasets
    // fetch datasets fail
    case actionTypes.FETCH_DATASETS_FAIL:
      return message.error(action.errorMesssage);

    // // // // // // //

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default datasetsReducer;
