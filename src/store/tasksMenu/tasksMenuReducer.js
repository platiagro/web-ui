// ACTION TYPES
import actionTypes from './actionTypes';

import templatesActionTypes from '../templates/actionTypes';

// UTILS
import utils from 'utils';

// INITIAL STATE
const initialState = { filtered: {}, unfiltered: {} };

/**
 * tasks menu reducer
 *
 * @param state
 * @param action
 * @param state
 * @param action
 */
const tasksMenuReducer = (state = initialState, action = undefined) => {
  switch (action.type) {
    // SUCCESS
    // tasks menu
    // fetch tasks menu success
    case actionTypes.FETCH_TASKS_MENU_SUCCESS:
      return {
        unfiltered: { ...action.tasksMenu },
        filtered: { ...action.tasksMenu },
      };
    // fetch templates success
    case templatesActionTypes.DELETE_TEMPLATE_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    // FAIL
    // tasks menu
    // fetch tasks menu fail
    case actionTypes.FETCH_TASKS_MENU_FAIL:
      return { ...state };

    // FAIL
    // tasks menu
    // delete templates menu fail
    case templatesActionTypes.DELETE_TEMPLATE_FAIL:
      return { ...state };
    // COMMON
    // tasks menu
    // filter tasks menu
    case actionTypes.FILTER_TASKS_MENU:
      return {
        ...state,
        filtered: {
          ...utils.filterMenu(state.unfiltered, action.filter),
        },
      };

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default tasksMenuReducer;
