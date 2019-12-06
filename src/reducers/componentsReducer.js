import {
  ADD_COMPONENT,
  DELETE_COMPONENT,
  FETCH_COMPONENTS_STARTED,
  FETCH_COMPONENTS,
  TOGGLE_MODAL_VISIBILITY,
} from '../actions/componentsActions';

const initialState = {
  componentList: [],
  modalIsVisible: false,
  loading: false,
  error: null,
};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_COMPONENT:
      return {
        ...state,
        loading: false,
        modalIsVisible: false,
      };
    case DELETE_COMPONENT:
      return {
        ...state,
        loading: false,
        componentList: state.componentList.filter(
          (component) => component.uuid !== action.id
        ),
      };
    case FETCH_COMPONENTS_STARTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COMPONENTS:
      return { ...state, componentList: action.components, loading: false };
    case TOGGLE_MODAL_VISIBILITY:
      return {
        ...state,
        modalIsVisible: !state.modalIsVisible,
      };
    default:
      return state;
  }
}
