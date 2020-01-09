/**
 * Reducer to store state for experiment details
 */
import {
  EXPERIMENT_FETCH,
  EXPERIMENT_FETCH_STARTED,
  EXPERIMENT_SET_COLUMNS,
  EXPERIMENT_SET_COLUMN_TYPE,
  EXPERIMENT_SET_RUN_STATUS,
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
  EXPERIMENT_SET_TARGET,
  EXPERIMENT_SET_TEMPLATE,
  EXPERIMENT_UPLOAD_DATASET,
  EXPERIMENT_CLEAR_SELECTED_TASK,
} from '../actions/experimentActions';

// FIXME: Alterar nome da variável txtName para headerFileName
// FIXME: Alterar nome da variável csvName para datasetFileName
const parameters = {
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
};

/**
 * FIXME: Remover redundancia de dados. targetColumnId, datasetId e headerId
 * já existem nos parametros
 */
const initialState = {
  uuid: '',
  name: '',
  projectId: '',
  pipelineIdTrain: '',
  pipelineIdDeploy: '',
  datasetId: '',
  headerId: '',
  targetColumnId: '',
  parameters,
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

/**
 * FIXME: sugerir nome descritivo para propriedade 'experiment' da action,
 * sugestão newExperimentDetails
 */
export default function experimentReducer(state = initialState, action) {
  const { experiment, newExperimentDetails } = action;
  switch (action.type) {
    case EXPERIMENT_FETCH_STARTED:
      return { ...state, loading: true };
    case EXPERIMENT_FETCH:
      if (experiment.parameters == null) delete experiment.parameters;
      else experiment.parameters = JSON.parse(experiment.parameters);
      return { ...initialState, ...experiment };
    case EXPERIMENT_SET_RUN_STATUS:
      return { ...state, runStatus: action.status };
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
    case EXPERIMENT_CLEAR_SELECTED_TASK: {
      const { selected } = action;

      return { ...state, selected };
    }
    case EXPERIMENT_SET_COLUMN_TYPE: {
      const { columnPosition, columnType } = action;
      const newColumns = [...state.columns];

      newColumns[columnPosition].datatype = columnType;

      return { ...state, columns: newColumns };
    }
    case EXPERIMENT_SET_TARGET: {
      return { ...state, ...newExperimentDetails };
    }
    case EXPERIMENT_SET_TEMPLATE: {
      return { ...state, ...newExperimentDetails };
    }
    case EXPERIMENT_UPLOAD_DATASET:
      return { ...state, ...newExperimentDetails };
    default:
      return state;
  }
}
