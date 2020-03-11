/**
 * Reducer to store state for components page
 */
import {
  COMPONENTS_ADD,
  COMPONENTS_DELETE,
  COMPONENTS_FETCH_STARTED,
  COMPONENTS_FETCH,
  COMPONENTS_TOGGLE_MODAL,
} from '../actions/componentsActions';

const initialState = {
  componentList: [],
  modalIsVisible: false,
  loading: false,
  error: null,
};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case COMPONENTS_ADD:
      return { ...state, modalIsVisible: false };
    case COMPONENTS_DELETE:
      return {
        ...state,
        loading: false,
        componentList: state.componentList.filter(
          (component) => component.uuid !== action.id
        ),
      };
    case COMPONENTS_FETCH_STARTED:
      return {
        ...state,
        loading: true,
      };
    case COMPONENTS_FETCH:
      return { ...state, componentList: action.components, loading: false };
    case COMPONENTS_TOGGLE_MODAL:
      return {
        ...state,
        modalIsVisible: !state.modalIsVisible,
      };
    default:
      return state;
  }
}
