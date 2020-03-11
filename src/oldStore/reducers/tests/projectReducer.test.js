import {
  PROJECT_FETCH_DETAIL_STARTED,
  PROJECT_FETCH_DETAIL,
  PROJECT_UPDATE_NAME,
  PROJECT_GET_PIPELINES,
} from '../../actions/projectActions';

import reducer from '../projectReducer';

const project = {
  uuid: '1',
  name: 'teste',
  experimentList: [],
};

describe('component reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      details: {},
      flowDetail: null,
      loading: false,
    });
  });

  it('should handle PROJECT_FETCH_DETAIL_STARTED', () => {
    expect(reducer({}, { type: PROJECT_FETCH_DETAIL_STARTED })).toEqual({
      loading: true,
    });
  });

  it('should handle PROJECT_FETCH_DETAIL', () => {
    expect(
      reducer({ details: {} }, { type: PROJECT_FETCH_DETAIL, detail: project })
    ).toEqual({
      details: project,
      loading: false,
    });
  });

  it('should handle PROJECT_UPDATE_NAME', () => {
    const aux = { ...project };
    aux.name = 'teste 123';
    expect(
      reducer(
        { details: project },
        { type: PROJECT_UPDATE_NAME, name: 'teste 123' }
      )
    ).toEqual({
      details: aux,
    });
  });

  it('should handle PROJECT_GET_PIPELINES', () => {
    const flowDetail = {
      databaseName: 'Linear Regression/Logistic Regression',
      default: false,
      disabled: false,
      name: 'Regressão Linear / Regressão Lógistica',
      pipelineDeployId: '69661d3a-f325-4a69-b261-c48b7886f940',
      pipelineTrainId: 'b396afa3-9bce-4305-b12f-7091e53f3591',
      template: 1,
    };
    expect(
      reducer({ flowDetail: null }, { type: PROJECT_GET_PIPELINES, flowDetail })
    ).toEqual({
      flowDetail,
    });
  });
});
