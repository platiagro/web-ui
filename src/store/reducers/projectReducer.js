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
  uuid: '',
  name: '',
  createdAt: '',
  experimentsList: [],
  loading: false,
};

export default function projectReducer(state = initialState, action) {
  switch (action.type) {
    case PROJECT_FETCH_DETAIL_STARTED:
      return { ...state, loading: true };
    case PROJECT_FETCH_DETAIL:
      return { ...state, ...action.project, loading: false };
    case PROJECT_UPDATE_NAME: {
      return { ...state, name: action.name };
    }
    case PROJECT_GET_PIPELINES:
      return { ...state, flowDetail: action.flowDetail };
    default:
      return state;
  }
}
