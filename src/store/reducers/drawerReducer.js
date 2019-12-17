/**
 * Reducer for Drawer
 */
import {
  SHOW_DRAWER,
  HIDE_DRAWER,
  SELECT_DRAWER,
  START_LOADING,
  END_LOADING,
  UPLOAD_DATASET,
} from '../actions/drawerActions';

// INITIAL STATE
const initialState = {
  // MAIN DRAWER
  visible: false,
  title: '',
  children: null,
  loading: false,
  // DATASET DRAWER
  dataset: null,
};

// REDUCER
export default function drawerReducer(state = initialState, action) {
  switch (action.type) {
    // MAIN DRAWER
    case SHOW_DRAWER:
      return { ...state, visible: action.visible };
    case HIDE_DRAWER:
      return { ...state, visible: action.visible };
    case SELECT_DRAWER:
      return { ...state, title: action.title, children: action.children };
    case START_LOADING:
      return { ...state, loading: action.loading };
    case END_LOADING:
      return { ...state, loading: action.loading };
    // DATASET DRAWER
    case UPLOAD_DATASET:
      return { ...state, dataset: action.dataset };
    default:
      return state;
  }
}
