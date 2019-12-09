import {
  COMPONENT_FETCH_DETAIL_STARTED,
  COMPONENT_FETCH_DETAIL,
  COMPONENT_FETCH_NAMESPACES,
  COMPONENT_UPDATE_FILE,
  COMPONENT_UPDATE_PARAMS,
  COMPONENT_UPDATE_NAME,
} from '../actions/componentActions';

const initialState = {
  details: {},
  namespaces: [],
  loading: false,
};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case COMPONENT_FETCH_DETAIL_STARTED:
      return { ...state, loading: true };
    case COMPONENT_FETCH_DETAIL:
      return { ...state, details: action.detail, loading: false };
    case COMPONENT_FETCH_NAMESPACES:
      return { ...state, namespaces: action.namespaces };
    case COMPONENT_UPDATE_FILE: {
      const auxDetails = { ...state.details };
      auxDetails.file = action.file;
      return { ...state, details: auxDetails };
    }
    case COMPONENT_UPDATE_PARAMS: {
      const auxDetails = { ...state.details };
      auxDetails.parameters = action.parameters;
      return { ...state, details: auxDetails };
    }
    case COMPONENT_UPDATE_NAME: {
      const auxDetails = { ...state.details };
      auxDetails.name = action.name;
      return { ...state, details: auxDetails };
    }
    default:
      return state;
  }
}
