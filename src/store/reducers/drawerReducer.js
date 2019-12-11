/**
 * Reducer for Drawer
 */
import {
  SHOW_DRAWER,
  HIDE_DRAWER,
  SELECT_DRAWER,
} from '../actions/drawerActions';

// INITIAL STATE
const initialState = {
  visible: false,
  title: '',
};

// REDUCER
export default function drawerReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_DRAWER:
      return { ...state, visible: action.visible };
    case HIDE_DRAWER:
      return { ...state, visible: action.visible };
    case SELECT_DRAWER:
      return { ...state, title: action.title };
    default:
      return state;
  }
}
