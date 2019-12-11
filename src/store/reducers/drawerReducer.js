/**
 * Reducer for Drawer
 */
import { SHOW_DRAWER, HIDE_DRAWER } from '../actions/drawerActions';

// INITIAL STATE
const initialState = {
  visible: false,
};

// REDUCER
export default function drawerReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_DRAWER:
      return { ...state, visible: action.visible };
    case HIDE_DRAWER:
      return { ...state, visible: action.visible };
    default:
      return state;
  }
}
