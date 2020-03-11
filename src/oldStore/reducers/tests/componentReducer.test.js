import {
  COMPONENT_FETCH_DETAIL_STARTED,
  COMPONENT_FETCH_DETAIL,
  COMPONENT_FETCH_NAMESPACES,
  COMPONENT_UPDATE_FILE,
  COMPONENT_UPDATE_PARAMS,
  COMPONENT_UPDATE_NAME,
} from '../../actions/componentActions';

import reducer from '../componentReducer';

const component = {
  uuid: '1',
  createdAt: new Date(),
  name: 'AutoML',
  parameters: [{ name: 'automl_time_limit', type: 'int', required: true }],
};

const namespaces = [
  {
    namespace: 'anonymous',
    role: 'contributor',
    user: 'anonymous@kubeflow.org',
  },
];

describe('component reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      details: {},
      namespaces: [],
      loading: false,
    });
  });

  it('should handle COMPONENT_FETCH_DETAIL_STARTED', () => {
    expect(reducer({}, { type: COMPONENT_FETCH_DETAIL_STARTED })).toEqual({
      loading: true,
    });
  });

  it('should handle COMPONENT_FETCH_DETAIL', () => {
    expect(
      reducer(
        { details: {} },
        { type: COMPONENT_FETCH_DETAIL, detail: component }
      )
    ).toEqual({
      details: component,
      loading: false,
    });
  });

  it('should handle COMPONENT_FETCH_NAMESPACES', () => {
    expect(
      reducer(
        { namespaces: [] },
        { type: COMPONENT_FETCH_NAMESPACES, namespaces }
      )
    ).toEqual({
      namespaces,
    });
  });

  it('should handle COMPONENT_UPDATE_FILE', () => {
    const file = { name: 'Teste Componente.ipynb' };
    const auxComponent = { ...component };
    auxComponent.file = file;
    expect(
      reducer({ details: component }, { type: COMPONENT_UPDATE_FILE, file })
    ).toEqual({
      details: auxComponent,
    });
  });

  it('should handle COMPONENT_UPDATE_PARAMS', () => {
    const auxComponent = { ...component };
    auxComponent.parameters = [];
    expect(
      reducer(
        { details: component },
        { type: COMPONENT_UPDATE_PARAMS, parameters: [] }
      )
    ).toEqual({
      details: auxComponent,
    });
  });

  it('should handle COMPONENT_UPDATE_NAME', () => {
    const auxComponent = { ...component };
    auxComponent.name = 'teste';
    expect(
      reducer(
        { details: component },
        { type: COMPONENT_UPDATE_NAME, name: 'teste' }
      )
    ).toEqual({
      details: auxComponent,
    });
  });
});
