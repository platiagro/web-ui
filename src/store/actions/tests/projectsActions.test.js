import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { URL } from '../../../services/projectsApi';
import * as actions from '../projectsActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('components actions', () => {
  it('should create an action PROJECTS_FETCH_STARTED', () => {
    const expectedAction = {
      type: actions.PROJECTS_FETCH_STARTED,
    };
    expect(actions.fetchStarted()).toEqual(expectedAction);
  });

  it('should create an action PROJECTS_FETCH_STARTED and PROJECTS_FETCH when get all projects', () => {
    nock(URL)
      .get('/projects')
      .reply(200, { payload: [] });

    const expectedActions = [
      { type: actions.PROJECTS_FETCH_STARTED },
      { type: actions.PROJECTS_FETCH, projects: [] },
    ];
    const store = mockStore();
    return store.dispatch(actions.fetchProjects()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action PROJECTS_ADD when create a new project', () => {
    nock(URL)
      .post('/projects')
      .reply(200, {
        payload: {
          uuid: '01',
          name: 'teste01',
        },
      });
    const expectedAction = [{ type: actions.PROJECTS_ADD }];
    const store = mockStore();
    return store.dispatch(actions.addProject('name', [])).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('should create an action PROJECTS_TOGGLE_MODAL', () => {
    const expectedAction = {
      type: actions.PROJECTS_TOGGLE_MODAL,
    };
    expect(actions.toggleModal()).toEqual(expectedAction);
  });
});
