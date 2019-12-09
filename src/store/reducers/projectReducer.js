import {
  PROJECT_FETCH_DETAIL_STARTED,
  PROJECT_FETCH_DETAIL,
} from '../actions/projectActions';

const initialState = {
  details: {},
  loading: false,
};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case PROJECT_FETCH_DETAIL_STARTED:
      return { ...state, loading: true };
    case PROJECT_FETCH_DETAIL:
      return { ...state, details: action.detail, loading: false };
    default:
      return state;
  }
}
