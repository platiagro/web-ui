/**
 * Reducer for Drawer
 */
import {
  DRAWER_SHOW_DRAWER,
  DRAWER_HIDE_DRAWER,
  DRAWER_SELECT_DRAWER,
  DRAWER_START_LOADING,
  DRAWER_END_LOADING,
} from '../actions/drawerActions';

// INITIAL STATE
const initialState = {
  // MAIN DRAWER
  visible: false,
  title: '',
  children: null,
  loading: false,
};

// REDUCER
export default function drawerReducer(state = initialState, action) {
  switch (action.type) {
    // MAIN DRAWER
    case DRAWER_SHOW_DRAWER:
      return { ...state, visible: action.visible };
    case DRAWER_HIDE_DRAWER:
      return { ...state, visible: action.visible };
    case DRAWER_SELECT_DRAWER:
      return { ...state, title: action.title, children: action.children };
    case DRAWER_START_LOADING:
      return { ...state, loading: action.loading };
    case DRAWER_END_LOADING:
      return { ...state, loading: action.loading };
    default:
      return state;
  }
}
