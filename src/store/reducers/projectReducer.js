/**
 * Reducer to store state for project page
 */
import {
  PROJECT_FETCH_DETAIL_STARTED,
  PROJECT_FETCH_DETAIL,
  PROJECT_UPDATE_NAME,
  PROJECT_GET_PIPELINES,
  PROJECT_SET_COLUMNS,
  PROJECT_SET_RUN_STATUS,
  PROJECT_SET_PARAMETERS,
  PROJECT_SET_SELECTED_DRAWER,
  PROJECT_SET_TASK_STATUS,
  PROJECT_SET_GROUP,
  PROJECT_SET_PERIOD,
  PROJECT_SET_CUT_OFF_PRE_1,
  PROJECT_SET_CORRELATION_PRE_1,
  PROJECT_SET_CUT_OFF_PRE_2,
  PROJECT_SET_CORRELATION_PRE_2,
  PROJECT_SET_FILTER,
  PROJECT_SET_AUTOML,
  PROJECT_SET_CSV,
  PROJECT_SET_TXT,
  PROJECT_SET_TARGET,
  PROJECT_SET_TEMPLATE,
  PROJECT_SET_DATASET,
} from '../actions/projectActions';

const initialState = {
  details: {},
  flowDetail: null,
  loading: false,
  columns: [],
  runStatus: 'Loading',
  experimentParameters: {
    atributos_tempo: {
      group: [],
      period: null,
    },
    pre_selecao1: { cutoff: 0.1, correlation: 0.7 },
    pre_selecao2: { cutoff: 0.1, correlation: 0.7 },
    filtro_atributos: [],
    automl: { time: 3 },
    conjunto_dados: {
      target: undefined,
      datasetId: null,
      txtName: null,
      csvName: null,
    },
  },
  selected: {
    conjunto_dados: false,
    atributos_tempo: false,
    pre_selecao1: false,
    atributos_genericos: false,
    pre_selecao2: false,
    filtro_atributos: false,
    automl: false,
    regression: false,
  },
  taskStatus: {
    conjunto_dados: null,
    atributos_tempo: null,
    pre_selecao1: null,
    atributos_genericos: null,
    pre_selecao2: null,
    filtro_atributos: null,
    automl: null,
    regression: null,
  },
};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case PROJECT_FETCH_DETAIL_STARTED:
      return { ...state, loading: true };
    case PROJECT_FETCH_DETAIL:
      return { ...state, details: action.detail, loading: false };
    case PROJECT_UPDATE_NAME: {
      const auxDetails = { ...state.details };
      auxDetails.name = action.name;
      return { ...state, details: auxDetails };
    }
    case PROJECT_GET_PIPELINES:
      return { ...state, flowDetail: action.flowDetail };
    case PROJECT_SET_COLUMNS:
      return { ...state, columns: action.columns };
    case PROJECT_SET_RUN_STATUS:
      return { ...state, runStatus: action.status };
    case PROJECT_SET_PARAMETERS:
      return { ...state, experimentParameters: action.parameters };
    case PROJECT_SET_SELECTED_DRAWER:
      return { ...state, selected: action.selected };
    case PROJECT_SET_TASK_STATUS:
      return { ...state, taskStatus: action.status };
    case PROJECT_SET_GROUP: {
      const newParameters = { ...state.experimentParameters };
      newParameters.atributos_tempo.group = action.group;
      return { ...state, experimentParameters: newParameters };
    }
    case PROJECT_SET_PERIOD: {
      const newParameters = { ...state.experimentParameters };
      newParameters.atributos_tempo.period = action.period;
      return { ...state, experimentParameters: newParameters };
    }
    case PROJECT_SET_CUT_OFF_PRE_1: {
      const newParameters = { ...state.experimentParameters };
      newParameters.pre_selecao1.cutoff = action.cutOffPre1;
      return { ...state, experimentParameters: newParameters };
    }
    case PROJECT_SET_CORRELATION_PRE_1: {
      const newParameters = { ...state.experimentParameters };
      newParameters.pre_selecao1.correlation = action.correlationPre1;
      return { ...state, experimentParameters: newParameters };
    }
    case PROJECT_SET_CUT_OFF_PRE_2: {
      const newParameters = { ...state.experimentParameters };
      newParameters.pre_selecao2.cutoff = action.cutOffPre2;
      return { ...state, experimentParameters: newParameters };
    }
    case PROJECT_SET_CORRELATION_PRE_2: {
      const newParameters = { ...state.experimentParameters };
      newParameters.pre_selecao2.correlation = action.correlationPre2;
      return { ...state, experimentParameters: newParameters };
    }
    case PROJECT_SET_FILTER: {
      const newParameters = { ...state.experimentParameters };
      newParameters.filtro_atributos = action.filter;
      return { ...state, experimentParameters: newParameters };
    }
    case PROJECT_SET_AUTOML: {
      const newParameters = { ...state.experimentParameters };
      newParameters.automl.time = action.automl;
      return { ...state, experimentParameters: newParameters };
    }
    case PROJECT_SET_CSV: {
      const newParameters = { ...state.experimentParameters };
      newParameters.conjunto_dados.csvName = action.csv;
      return { ...state, experimentParameters: newParameters };
    }
    case PROJECT_SET_TXT: {
      const newParameters = { ...state.experimentParameters };
      newParameters.conjunto_dados.txtName = action.txt;
      return { ...state, experimentParameters: newParameters };
    }
    case PROJECT_SET_TARGET: {
      const newParameters = { ...state.experimentParameters };
      newParameters.conjunto_dados.target = action.target;
      return { ...state, experimentParameters: newParameters };
    }
    case PROJECT_SET_TEMPLATE: {
      const newParameters = { ...state.experimentParameters };
      newParameters.template = action.template;
      return { ...state, experimentParameters: newParameters };
    }
    case PROJECT_SET_DATASET: {
      const newParameters = { ...state.experimentParameters };
      newParameters.conjunto_dados.datasetId = action.dataset;
      return { ...state, experimentParameters: newParameters };
    }
    default:
      return state;
  }
}
