import {
  PROJECTS_ADD,
  PROJECTS_FETCH,
  PROJECTS_FETCH_STARTED,
  PROJECTS_TOGGLE_MODAL,
} from '../actions/projectsActions';

const initialState = {
  projectsList: [],
  modalIsVisible: false,
  loading: false,
  error: null,
};

export default function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case PROJECTS_ADD:
      return {
        ...state,
        loading: false,
        modalIsVisible: false,
      };
    case PROJECTS_FETCH:
      return { ...state, projectsList: action.projects, loading: false };
    case PROJECTS_FETCH_STARTED:
      return {
        ...state,
        loading: true,
      };
    case PROJECTS_TOGGLE_MODAL:
      return { ...state, modalIsVisible: !state.modalIsVisible };
    default:
      return state;
  }
}
