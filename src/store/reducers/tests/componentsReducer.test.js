import {
  COMPONENTS_ADD,
  COMPONENTS_DELETE,
  COMPONENTS_FETCH_STARTED,
  COMPONENTS_FETCH,
  COMPONENTS_TOGGLE_MODAL,
} from '../../actions/componentsActions';

import reducer from '../componentsReducer';

const component1 = {
  uuid: '1',
  createdAt: new Date(),
  name: 'AutoML',
};

const component2 = {
  uuid: '2',
  createdAt: new Date(),
  name: 'Criação de atributos por tempo',
};

const componentList = [component1, component2];

describe('components reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      componentList: [],
      modalIsVisible: false,
      loading: false,
      error: null,
    });
  });

  it('should handle COMPONENTS_ADD', () => {
    expect(reducer({}, { type: COMPONENTS_ADD })).toEqual({
      modalIsVisible: false,
    });
  });

  it('should handle COMPONENTS_DELETE', () => {
    expect(
      reducer({ componentList }, { type: COMPONENTS_DELETE, id: '1' })
    ).toEqual({
      componentList: [component2],
      loading: false,
    });
  });

  it('should handle COMPONENTS_FETCH_STARTED', () => {
    expect(reducer({}, { type: COMPONENTS_FETCH_STARTED })).toEqual({
      loading: true,
    });
  });

  it('should handle COMPONENTS_FETCH', () => {
    expect(
      reducer({}, { type: COMPONENTS_FETCH, components: componentList })
    ).toEqual({
      loading: false,
      componentList,
    });
  });

  it('should handle COMPONENTS_TOGGLE_MODAL', () => {
    expect(
      reducer({ modalIsVisible: false }, { type: COMPONENTS_TOGGLE_MODAL })
    ).toEqual({
      modalIsVisible: true,
    });
  });
});
