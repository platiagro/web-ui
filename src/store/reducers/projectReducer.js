/**
 * Reducer to store state for project page
 */
import {
  PROJECT_RESET,
  PROJECT_FETCH_DETAIL_STARTED,
  PROJECT_FETCH_DETAIL,
  PROJECT_UPDATE_NAME,
  PROJECT_GET_PIPELINES,
  PROJECT_SET_ACTIVE_KEY,
  PROJECT_ADD_EXPERIMENT,
} from '../actions/projectActions';

const initialState = {
  uuid: '',
  name: '',
  createdAt: '',
  experimentsList: [],
  loading: false,
  activeKey: null,
};

export default function projectReducer(state = initialState, action) {
  switch (action.type) {
    case PROJECT_RESET:
      return initialState;
    case PROJECT_FETCH_DETAIL_STARTED:
      return { ...state, loading: true };
    case PROJECT_FETCH_DETAIL:
      return { ...state, ...action.project, loading: false };
    case PROJECT_UPDATE_NAME:
      return { ...state, name: action.name };
    case PROJECT_GET_PIPELINES:
      return { ...state, flowDetail: action.flowDetail };
    case PROJECT_SET_ACTIVE_KEY:
      return { ...state, activeKey: action.activeKey };
    case PROJECT_ADD_EXPERIMENT: {
      const { newExperiment } = action;
      const experimentsListAux = [newExperiment, ...state.experimentsList];
      return {
        ...state,
        activeKey: newExperiment.uuid,
        experimentsList: experimentsListAux,
      };
    }
    default:
      return state;
  }
}
