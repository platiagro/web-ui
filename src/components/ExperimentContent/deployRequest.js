import _ from 'lodash';
import { startRun } from '../../services/pipelinesApi';
import { updateExperiment } from '../../services/projectsApi';

const deployRequest = async (
  columns,
  details,
  experimentParameters,
  projectName
) => {
  // Montar objeto
  const { atributos_tempo, conjunto_dados } = experimentParameters;

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
          name: 'deployment-name',
          value: details.uuid.toLowerCase(),
        },
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
      ];
      break;
    case 'AutoFeaturing + Linear Regression/Logistic Regression':
      parms = [
        {
          name: 'deployment-name',
          value: details.uuid.toLowerCase(),
        },
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
          name: 'feature-tools-group',
          value: insertComma(atributos_tempo.group),
        },
      ];
      break;
    case 'AutoFeaturing + AutoML':
      parms = [
        {
          name: 'deployment-name',
          value: details.uuid.toLowerCase(),
        },
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
          name: 'feature-tools-group',
          value: insertComma(atributos_tempo.group),
        },
      ];
      break;
    case 'Linear Regression/Logistic Regression':
      parms = [
        {
          name: 'deployment-name',
          value: details.uuid.toLowerCase(),
        },
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
      ];
      break;
    default:
      parms = [];
  }

  const mountName = () => {
    return `${projectName} - ${details.name}`;
  };

  const runRequestDeploy = {
    pipeline_spec: {
      parameters: parms,
      pipeline_id: details.pipelineIdDeploy,
    },
    name: mountName(),
  };

  console.log(JSON.stringify(runRequestDeploy));

  const deployResponse = await startRun(JSON.stringify(runRequestDeploy));
  if (deployResponse) {
    console.log(deployResponse);
    console.log(deployResponse.data.run.id);
    const resUpdate = await updateExperiment(details.projectId, details.uuid, {
      runStatus: 'Deployed',
    });
    if (resUpdate) fetch();
  }
};

export default deployRequest;
