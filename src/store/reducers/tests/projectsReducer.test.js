import {
  PROJECTS_ADD,
  PROJECTS_FETCH,
  PROJECTS_FETCH_STARTED,
  PROJECTS_TOGGLE_MODAL,
} from '../../actions/projectsActions';

import reducer from '../projectsReducer';

const projects = [
  {
    uuid: '01',
    name: 'test01',
  },
];

describe('projects reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      projectsList: [],
      modalIsVisible: false,
      loading: false,
      error: null,
    });
  });

  it('should handle PROJECTS_FETCH ', () => {
    expect(
      reducer({ projectsList: [] }, { type: PROJECTS_FETCH, projects })
    ).toEqual({
      projectsList: projects,
      loading: false,
    });
  });

  it('should handle PROJECTS_ADD ', () => {
    expect(reducer({}, { type: PROJECTS_ADD })).toEqual({
      loading: false,
      modalIsVisible: false,
    });
  });

  it('should handle PROJECTS_FETCH_STARTED', () => {
    expect(reducer({}, { type: PROJECTS_FETCH_STARTED })).toEqual({
      loading: true,
    });
  });

  it('should handle PROJECTS_TOGGLE_MODAL', () => {
    expect(
      reducer({ modalIsVisible: false }, { type: PROJECTS_TOGGLE_MODAL })
    ).toEqual({
      modalIsVisible: true,
    });
  });
});
