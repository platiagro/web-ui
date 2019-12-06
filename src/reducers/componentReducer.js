import {
  FETCH_COMPONENT_DETAIL_STARTED,
  FETCH_COMPONENT_DETAIL,
  FETCH_JUPYTER_NAMESPACES,
  UPDATE_COMPONENT_FILE,
  UPDATE_COMPONENT_PARAMS,
  UPDATE_COMPONENT_NAME,
} from '../actions/componentActions';

const initialState = {
  details: {},
  namespaces: [],
  loading: false,
};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COMPONENT_DETAIL_STARTED:
      return { ...state, loading: true };
    case FETCH_COMPONENT_DETAIL:
      return { ...state, details: action.detail, loading: false };
    case FETCH_JUPYTER_NAMESPACES:
      return { ...state, namespaces: action.namespaces };
    case UPDATE_COMPONENT_FILE: {
      const auxDetails = { ...state.details };
      auxDetails.file = action.file;
      return { ...state, details: auxDetails };
    }
    case UPDATE_COMPONENT_PARAMS: {
      const auxDetails = { ...state.details };
      auxDetails.parameters = action.parameters;
      return { ...state, details: auxDetails };
    }
    case UPDATE_COMPONENT_NAME: {
      const auxDetails = { ...state.details };
      auxDetails.name = action.name;
      return { ...state, details: auxDetails };
    }
    default:
      return state;
  }
}
