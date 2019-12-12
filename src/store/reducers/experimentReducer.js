/**
 * Reducer to store state for experiment details
 */
import {
  EXPERIMENT_FETCH,
  EXPERIMENT_FETCH_STARTED,
  EXPERIMENT_SET_COLUMNS,
  EXPERIMENT_SET_RUN_STATUS,
  EXPERIMENT_SET_PARAMETERS,
  EXPERIMENT_SET_SELECTED_DRAWER,
  EXPERIMENT_SET_TASK_STATUS,
  EXPERIMENT_SET_GROUP,
  EXPERIMENT_SET_PERIOD,
  EXPERIMENT_SET_CUT_OFF_PRE_1,
  EXPERIMENT_SET_CORRELATION_PRE_1,
  EXPERIMENT_SET_CUT_OFF_PRE_2,
  EXPERIMENT_SET_CORRELATION_PRE_2,
  EXPERIMENT_SET_FILTER,
  EXPERIMENT_SET_AUTOML,
  EXPERIMENT_SET_CSV,
  EXPERIMENT_SET_TXT,
  EXPERIMENT_SET_TARGET,
  EXPERIMENT_SET_TEMPLATE,
  EXPERIMENT_SET_DATASET,
} from '../actions/experimentActions';

const initialState = {
  uuid: '',
  name: '',
  projectId: '',
  pipelineIdTrain: '',
  pipelineIdDeploy: '',
  datasetId: '',
  headerId: '',
  targetColumnId: '',
  parameters: {
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
  createdAt: '',
  runId: '',
  runStatus: '',
  template: '',
  position: 0,
  componentsList: [],
  loading: false,
  columns: [],
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

export default function experimentReducer(state = initialState, action) {
  const { experiment } = action;
  switch (action.type) {
    case EXPERIMENT_FETCH_STARTED:
      return { ...state, loading: true };
    case EXPERIMENT_FETCH:
      if (experiment.parameters == null) delete experiment.parameters;
      return { ...state, ...experiment };
    case EXPERIMENT_SET_COLUMNS:
      return { ...state, columns: action.columns };
    case EXPERIMENT_SET_RUN_STATUS:
      return { ...state, runStatus: action.status };
    case EXPERIMENT_SET_PARAMETERS:
      return { ...state, parameters: action.parameters };
    case EXPERIMENT_SET_SELECTED_DRAWER:
      return { ...state, selected: action.selected };
    case EXPERIMENT_SET_TASK_STATUS:
      return { ...state, taskStatus: action.status };
    case EXPERIMENT_SET_GROUP: {
      const newParameters = { ...state.parameters };
      newParameters.atributos_tempo.group = action.group;
      return { ...state, parameters: newParameters };
    }
    case EXPERIMENT_SET_PERIOD: {
      const newParameters = { ...state.parameters };
      newParameters.atributos_tempo.period = action.period;
      return { ...state, parameters: newParameters };
    }
    case EXPERIMENT_SET_CUT_OFF_PRE_1: {
      const newParameters = { ...state.parameters };
      newParameters.pre_selecao1.cutoff = action.cutOffPre1;
      return { ...state, parameters: newParameters };
    }
    case EXPERIMENT_SET_CORRELATION_PRE_1: {
      const newParameters = { ...state.parameters };
      newParameters.pre_selecao1.correlation = action.correlationPre1;
      return { ...state, parameters: newParameters };
    }
    case EXPERIMENT_SET_CUT_OFF_PRE_2: {
      const newParameters = { ...state.parameters };
      newParameters.pre_selecao2.cutoff = action.cutOffPre2;
      return { ...state, parameters: newParameters };
    }
    case EXPERIMENT_SET_CORRELATION_PRE_2: {
      const newParameters = { ...state.parameters };
      newParameters.pre_selecao2.correlation = action.correlationPre2;
      return { ...state, parameters: newParameters };
    }
    case EXPERIMENT_SET_FILTER: {
      const newParameters = { ...state.parameters };
      newParameters.filtro_atributos = action.filter;
      return { ...state, parameters: newParameters };
    }
    case EXPERIMENT_SET_AUTOML: {
      const newParameters = { ...state.parameters };
      newParameters.automl.time = action.automl;
      return { ...state, parameters: newParameters };
    }
    case EXPERIMENT_SET_CSV: {
      const newParameters = { ...state.parameters };
      newParameters.conjunto_dados.csvName = action.csv;
      return { ...state, parameters: newParameters };
    }
    case EXPERIMENT_SET_TXT: {
      const newParameters = { ...state.parameters };
      newParameters.conjunto_dados.txtName = action.txt;
      return { ...state, parameters: newParameters };
    }
    case EXPERIMENT_SET_TARGET: {
      const newParameters = { ...state.parameters };
      newParameters.conjunto_dados.target = action.target;
      return { ...state, parameters: newParameters };
    }
    case EXPERIMENT_SET_TEMPLATE: {
      const newParameters = { ...state.parameters };
      newParameters.template = action.template;
      return { ...state, parameters: newParameters };
    }
    case EXPERIMENT_SET_DATASET: {
      const newParameters = { ...state.parameters };
      newParameters.conjunto_dados.datasetId = action.dataset;
      return { ...state, parameters: newParameters };
    }
    default:
      return state;
  }
}
