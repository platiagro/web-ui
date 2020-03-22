// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// UTILS
import utils from '../../utils';

// INITIAL STATE
const initialState = { filtered: {}, unfiltered: {} };

/**
 * components menu reducer
 */
const componentsMenu = (state = initialState, action) => {
  switch (action.type) {
    // SUCCESS
    // components menu
    // fetch components menu success
    case actionTypes.FETCH_COMPONENTS_MENU_SUCCESS:
      return {
        unfiltered: { ...action.componentsMenu },
        filtered: { ...action.componentsMenu },
      };

    // FAIL
    // components menu
    // fetch components menu fail
    case actionTypes.FETCH_COMPONENTS_MENU_FAIL:
      return message.error(action.errorMessage);

    // COMMON
    // components menu
    // filter components menu
    case actionTypes.FILTER_COMPONENTS_MENU:
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
export default componentsMenu;
