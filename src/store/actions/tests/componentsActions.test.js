import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { URL } from '../../../services/componentsApi';
import * as actions from '../componentsActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const component_id = '1';
const component = {
  uuid: component_id,
  name: 'teste',
};
const componentList = [component];

describe('components actions', () => {
  it('should create an action COMPONENTS_ADD', () => {
    const expectedAction = {
      type: actions.COMPONENTS_ADD,
    };
    expect(actions.dispatchAdd()).toEqual(expectedAction);
  });

  it('should call COMPONENTS_ADD when add component has been done', () => {
    nock(URL)
      .post('/components/')
      .reply(200, {
        payload: {
          uuid: '123',
          name: 'teste',
        },
      });

    const expectedActions = [{ type: actions.COMPONENTS_ADD }];
    const store = mockStore({ modalIsVisible: false });
    return store.dispatch(actions.addComponent('name', [])).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action COMPONENTS_DELETE', () => {
    const id = '123';
    const expectedAction = {
      type: actions.COMPONENTS_DELETE,
      id,
    };
    expect(actions.dispatchDelete(id)).toEqual(expectedAction);
  });

  it('should call COMPONENTS_DELETE when delete component has been done', () => {
    nock(URL)
      .delete(`/components/${component_id}`)
      .reply(200, {});

    const expectedActions = [
      { type: actions.COMPONENTS_DELETE, id: component_id },
    ];
    const store = mockStore({ componentList });
    return store.dispatch(actions.deleteComponent(component_id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action COMPONENTS_FETCH_STARTED', () => {
    const expectedAction = {
      type: actions.COMPONENTS_FETCH_STARTED,
    };
    expect(actions.fetchStarted()).toEqual(expectedAction);
  });

  it('should create an action COMPONENTS_FETCH', () => {
    const expectedAction = {
      type: actions.COMPONENTS_FETCH,
      components: componentList,
    };
    expect(actions.dispatchFetchComponents(componentList)).toEqual(
      expectedAction
    );
  });

  it('should call COMPONENTS_FETCH_STARTED and COMPONENTS_FETCH when fetch components has been done', () => {
    nock(URL)
      .get(`/components`)
      .reply(200, { payload: componentList });

    const expectedActions = [
      { type: actions.COMPONENTS_FETCH_STARTED },
      { type: actions.COMPONENTS_FETCH, components: componentList },
    ];
    const store = mockStore({ componentList });
    return store.dispatch(actions.fetchComponents()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action COMPONENTS_TOGGLE_MODAL', () => {
    const expectedAction = {
      type: actions.COMPONENTS_TOGGLE_MODAL,
    };
    expect(actions.toggleModal()).toEqual(expectedAction);
  });
});
