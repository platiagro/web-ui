import _ from 'lodash';
import pollingRun from './polling';
import { startRun } from '../../services/pipelinesApi';
import { updateExperiment } from '../../services/projectsApi';

const mountObjectRequest = async (
  columns,
  details,
  experimentParameters,
  setRunStatus,
  taskStatus,
  setTaskStatus
) => {
  // Montar objeto
  const {
    atributos_tempo,
    pre_selecao1,
    pre_selecao2,
    filtro_atributos,
    automl,
    conjunto_dados,
  } = experimentParameters;

  setRunStatus('StartRun');

  const insertComma = (arr) => {
    return arr.join(', ');
  };

  const findDate = () => {
    const date = _.find(columns, {
      datatype: 'DateTime',
    });
    return date ? date.name : '';
  };

  const findTarget = (id) => {
    const target = _.find(columns, {
      uuid: id,
    });
    return target ? target.name : '';
  };

  const getPeriod = () => {
    return atributos_tempo.period ? atributos_tempo.period : '';
  };

  let parms;

  switch (details.template) {
    case 'AutoML':
      parms = [
        {
          name: 'experiment-id',
          value: details.uuid,
        },
        {
          name: 'bucket',
          value: 'mlpipeline',
        },
        {
          name: 'csv',
          value: conjunto_dados.csvName,
        },
        {
          name: 'txt',
          value: conjunto_dados.txtName,
        },
        {
          name: 'target',
          value: findTarget(conjunto_dados.target),
        },
        {
          name: 'date',
          value: findDate(),
        },
        {
          name: 'date-format',
          value: '%Y-%m-%d',
        },
        {
          name: 'filter-columns',
          value: insertComma(filtro_atributos),
        },
        {
          name: 'automl-time-limit',
          value: (automl.time * 60).toString(),
        },
      ];
      break;
    case 'AutoFeaturing + Linear Regression/Logistic Regression':
      parms = [
        {
          name: 'experiment-id',
          value: details.uuid,
        },
        {
          name: 'bucket',
          value: 'mlpipeline',
        },
        {
          name: 'csv',
          value: conjunto_dados.csvName,
        },
        {
          name: 'txt',
          value: conjunto_dados.txtName,
        },
        {
          name: 'target',
          value: findTarget(conjunto_dados.target),
        },
        {
          name: 'date',
          value: findDate(),
        },
        {
          name: 'date-format',
          value: '%Y-%m-%d',
        },
        {
          name: 'feature-temporal-group',
          value: insertComma(atributos_tempo.group),
        },
        {
          name: 'feature-temporal-period',
          value: getPeriod(),
        },
        {
          name: 'preselection-1-na-cutoff',
          value: pre_selecao1.cutoff.toString(),
        },
        {
          name: 'preselection-1-correlation-cutoff',
          value: pre_selecao1.correlation.toString(),
        },
        {
          name: 'feature-tools-group',
          value: insertComma(atributos_tempo.group),
        },
        {
          name: 'preselection-2-na-cutoff',
          value: pre_selecao2.cutoff.toString(),
        },
        {
          name: 'preselection-2-correlation-cutoff',
          value: pre_selecao2.correlation.toString(),
        },
        {
          name: 'filter-columns',
          value: insertComma(filtro_atributos),
        },
      ];
      break;
    case 'AutoFeaturing + AutoML':
      parms = [
        {
          name: 'experiment-id',
          value: details.uuid,
        },
        {
          name: 'bucket',
          value: 'mlpipeline',
        },
        {
          name: 'csv',
          value: conjunto_dados.csvName,
        },
        {
          name: 'txt',
          value: conjunto_dados.txtName,
        },
        {
          name: 'target',
          value: findTarget(conjunto_dados.target),
        },
        {
          name: 'date',
          value: findDate(),
        },
        {
          name: 'date-format',
          value: '%Y-%m-%d',
        },
        {
          name: 'feature-temporal-group',
          value: insertComma(atributos_tempo.group),
        },
        {
          name: 'feature-temporal-period',
          value: getPeriod(),
        },
        {
          name: 'preselection-1-na-cutoff',
          value: pre_selecao1.cutoff.toString(),
        },
        {
          name: 'preselection-1-correlation-cutoff',
          value: pre_selecao1.correlation.toString(),
        },
        {
          name: 'feature-tools-group',
          value: insertComma(atributos_tempo.group),
        },
        {
          name: 'preselection-2-na-cutoff',
          value: pre_selecao2.cutoff.toString(),
        },
        {
          name: 'preselection-2-correlation-cutoff',
          value: pre_selecao2.correlation.toString(),
        },
        {
          name: 'filter-columns',
          value: insertComma(filtro_atributos),
        },
        {
          name: 'automl-time-limit',
          value: (automl.time * 60).toString(),
        },
      ];
      break;
    case 'Linear Regression/Logistic Regression':
      parms = [
        {
          name: 'experiment-id',
          value: details.uuid,
        },
        {
          name: 'bucket',
          value: 'mlpipeline',
        },
        {
          name: 'csv',
          value: conjunto_dados.csvName,
        },
        {
          name: 'txt',
          value: conjunto_dados.txtName,
        },
        {
          name: 'target',
          value: findTarget(conjunto_dados.target),
        },
        {
          name: 'date',
          value: findDate(),
        },
        {
          name: 'date-format',
          value: '%Y-%m-%d',
        },
        {
          name: 'filter-columns',
          value: insertComma(filtro_atributos),
        },
      ];
      break;
    default:
      parms = [];
  }

  const mountName = () => {
    return `[${details.template}] ${details.name}`;
  };

  const runRequestTrain = {
    pipeline_spec: {
      parameters: parms,
      pipeline_id: details.pipelineIdTrain,
      // pipeline_id: null,
    },
    name: mountName(),
  };

  console.log(JSON.stringify(runRequestTrain));

  const runResponse = await startRun(JSON.stringify(runRequestTrain));
  if (runResponse) {
    // console.log(runResponse.data.run.id);
    const updateRes = await updateExperiment(details.projectId, details.uuid, {
      runId: runResponse.data.run.id,
    });
    if (updateRes) {
      // await fetch();
      pollingRun(
        details,
        runResponse.data.run.id,
        taskStatus,
        setTaskStatus,
        setRunStatus
      );
    }
  } else {
    setRunStatus(null);
  }
};

export default mountObjectRequest;
