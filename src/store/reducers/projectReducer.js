/**
 * Reducer to store state for project page
 */
import {
  PROJECT_FETCH_DETAIL_STARTED,
  PROJECT_FETCH_DETAIL,
  PROJECT_UPDATE_NAME,
  PROJECT_GET_PIPELINES,
} from '../actions/projectActions';

const initialState = {
  details: {},
  flowDetail: null,
  loading: false,
};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case PROJECT_FETCH_DETAIL_STARTED:
      return { ...state, loading: true };
    case PROJECT_FETCH_DETAIL:
      return { ...state, details: action.detail, loading: false };
    case PROJECT_UPDATE_NAME: {
      const auxDetails = { ...state.details };
      auxDetails.name = action.name;
      return { ...state, details: auxDetails };
    }
    case PROJECT_GET_PIPELINES:
      return { ...state, flowDetail: action.flowDetail };
    default:
      return state;
  }
}
