import utils from 'utils';

import actionTypes from './actionTypes';
import templatesActionTypes from '../templates/actionTypes';

const initialState = {
  filtered: {},
  unfiltered: {},
};

const tasksMenuReducer = (state = initialState, action = undefined) => {
  switch (action.type) {
    case actionTypes.FETCH_TASKS_MENU_SUCCESS:
      return {
        unfiltered: { ...action.tasksMenu },
        filtered: { ...action.tasksMenu },
      };

    case templatesActionTypes.DELETE_TEMPLATE_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case actionTypes.FETCH_TASKS_MENU_FAIL:
      return { ...state };

    case templatesActionTypes.DELETE_TEMPLATE_FAIL:
      return { ...state };

    case actionTypes.FILTER_TASKS_MENU:
      return {
        ...state,
        filtered: {
          ...utils.filterMenu(state.unfiltered, action.filter),
        },
      };

    default:
      return state;
  }
};

export default tasksMenuReducer;
