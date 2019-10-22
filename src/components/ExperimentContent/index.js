/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import './style.scss';
import { Button, Divider, message, Icon, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import EditableTitle from './EditableTitle';
import ExperimentFlow from '../ExperimentFlow';
import MainDrawer from '../MainDrawer';
import GenericAttributeCreationDrawerContent from '../GenericAttributeCreationDrawerContent';
import AttributeFilterDrawerContent from '../AttributeFilterDrawerContent';
import AttributePreSelectionDrawerContent from '../AttributePreSelectionDrawerContent';
import AutoMLDrawerContent from '../AutoMLDrawerContent';
import DataSetDrawerContent from '../DataSetDrawerContent';
import ResultsDrawer from '../ResultsDrawer';
import TimeAttributeCreationDrawerContent from '../TimeAttributeCreationDrawerContent';
import { updateExperiment } from '../../services/projectsApi';
import { startRun, getStatusRun } from '../../services/pipelinesApi';
import {
  getHeader,
  getHeaderColumns,
  getDataSet,
} from '../../services/dataSetApi';

const { Paragraph } = Typography;

const ExperimentContent = ({ details, flowDetails, fetch, projectName }) => {
  const params = useParams();

  const [columns, setColumns] = useState([]);

  const [runStatus, setRunStatus] = useState('Loading');

  const baseParameters = {
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

  const [experimentParameters, setParameters] = useState(
    JSON.parse(details.parameters) || baseParameters
  );

  const [selected, setSelected] = useState({
    conjunto_dados: false,
    atributos_tempo: false,
    pre_selecao1: false,
    atributos_genericos: false,
    pre_selecao2: false,
    filtro_atributos: false,
    automl: false,
    regression: false,
  });

  // TODO
  // const [taskStatus, setTaskStatus] = useState({
  //   conjunto_dados: null,
  //   atributos_tempo: null,
  //   pre_selecao1: null,
  //   atributos_genericos: null,
  //   pre_selecao2: null,
  //   filtro_atributos: null,
  //   automl: null,
  // });
  const [taskStatus, setTaskStatus] = useState({
    conjunto_dados: null,
    atributos_tempo: null,
    pre_selecao1: null,
    atributos_genericos: null,
    pre_selecao2: null,
    filtro_atributos: null,
    automl: null,
    regression: null,
  });

  const url =
    'http://localhost:8000/seldon/kubeflow/irrigacao-autofeaturing-regression-c96ac290/api/v0.1/predictions';

  // Métodos para alterar valores dos Drawers
  // Atributos por tempo
  const setGroup = (e) => {
    const newParameters = { ...experimentParameters };
    newParameters.atributos_tempo.group = e;
    setParameters(newParameters);
  };

  const setPeriod = (e) => {
    const newParameters = { ...experimentParameters };
    newParameters.atributos_tempo.period = e.target.value;
    setParameters(newParameters);
  };
  // Pré-seleção 1
  const setCutoffPre1 = (e) => {
    const newParameters = { ...experimentParameters };
    newParameters.pre_selecao1.cutoff = e;
    setParameters(newParameters);
  };
  const setCorrelationPre1 = (e) => {
    const newParameters = { ...experimentParameters };
    newParameters.pre_selecao1.correlation = e;
    setParameters(newParameters);
  };
  // Pré-seleção 2
  const setCutoffPre2 = (e) => {
    const newParameters = { ...experimentParameters };
    newParameters.pre_selecao2.cutoff = e;
    setParameters(newParameters);
  };
  const setCorrelationPre2 = (e) => {
    const newParameters = { ...experimentParameters };
    newParameters.pre_selecao2.correlation = e;
    setParameters(newParameters);
  };

  const setFilter = (e) => {
    const newParameters = { ...experimentParameters };
    newParameters.filtro_atributos = e;
    setParameters(newParameters);
  };
  const setAutoML = (e) => {
    const newParameters = { ...experimentParameters };
    newParameters.automl.time = e;
    setParameters(newParameters);
  };

  // Set Datasets

  const setCSV = (e) => {
    const newParameters = { ...experimentParameters };
    newParameters.conjunto_dados.csvName = e;
    setParameters(newParameters);
  };
  const setTXT = (e) => {
    const newParameters = { ...experimentParameters };
    newParameters.conjunto_dados.txtName = e;
    setParameters(newParameters);
  };
  const setTarget = (e) => {
    const newParameters = { ...experimentParameters };
    newParameters.conjunto_dados.target = e;
    setParameters(newParameters);
  };

  const setTemplate = (obj) => {
    const newParameters = { ...experimentParameters };
    newParameters.template = obj;
    setParameters(newParameters);
  };

  const setUploadedColumns = (e) => {
    setColumns(e);
  };

  const setDataset = (e) => {
    const newParameters = { ...experimentParameters };
    newParameters.conjunto_dados.datasetId = e;
    setParameters(newParameters);
  };

  // Click para abrir drawer de cada tarefa
  const handleClick = (task) => {
    let newSelected = { ...selected };
    newSelected = _.mapValues(selected, (value, key) => {
      if (key === task) return !value;
      return false;
    });

    setSelected(newSelected);
  };

  const getPhase = (param, manifest, alter = null) => {
    return Object.values(manifest).find((n) => n.displayName === param)
      ? Object.values(manifest).find((n) => n.displayName === param).phase
      : alter;
  };

  const pollingRun = (pollingId) => {
    let intervalPolling;
    async function fetchRunStatus() {
      const runRes = await getStatusRun(pollingId);

      if (runRes) {
        if (
          runRes.data.run.status === 'Running' ||
          runRes.data.run.status === undefined
        ) {
          console.info('[STATUS]', runRes.data.run.status);

          if (runRes.data.run.status) {
            setRunStatus(runRes.data.run.status);
            const manifest = JSON.parse(
              runRes.data.pipeline_runtime.workflow_manifest
            );

            const tasks = { ...taskStatus };

            // if (
            //   details.template === 'Linear Regression/Logistic Regression' ||
            //   details.template === 'AutoML'
            // ) {
            //   tasks.conjunto_dados = getPhase('filter', manifest.status.nodes);
            // } else {
            //   tasks.conjunto_dados = getPhase(
            //     'feature-temporal',
            //     manifest.status.nodes
            //   );
            // }
            tasks.conjunto_dados = 'Succeeded';

            tasks.atributos_tempo = getPhase(
              'feature-temporal',
              manifest.status.nodes,
              'Pending'
            );

            tasks.pre_selecao1 = getPhase(
              'pre-selection-1',
              manifest.status.nodes,
              'Pending'
            );

            tasks.atributos_genericos = getPhase(
              'feature-tools',
              manifest.status.nodes,
              'Pending'
            );

            tasks.pre_selecao2 = getPhase(
              'pre-selection-2',
              manifest.status.nodes,
              'Pending'
            );

            tasks.filtro_atributos = getPhase(
              'filter',
              manifest.status.nodes,
              'Pending'
            );

            tasks.automl = getPhase('automl', manifest.status.nodes, 'Pending');

            tasks.regression = getPhase(
              'regression',
              manifest.status.nodes,
              'Pending'
            );

            setTaskStatus(tasks);
          }
        } else {
          clearInterval(intervalPolling);
          console.log('Finalizou', runRes.data.run);
          if (runRes.data.run.status === 'Succeeded') {
            message.success(`${runRes.data.run.name} finalizou com Sucesso!`);
            const resUpdate = await updateExperiment(
              details.projectId,
              details.uuid,
              {
                runStatus: 'Succeeded',
              }
            );
            console.info(resUpdate);
          } else if (runRes.data.run.status === 'Failed') {
            message.error(`${runRes.data.run.name} finalizou com Falha!`);
          }

          setRunStatus(runRes.data.run.status);

          const manifest = JSON.parse(
            runRes.data.pipeline_runtime.workflow_manifest
          );

          //   // feature-temporal
          //   // pre-selection-1
          //   // feature-tools
          //   // pre-selection-2
          //   // filter
          //   // automl
          //   // regression
          const tasks = { ...taskStatus };

          // if (
          //   details.template === 'Linear Regression/Logistic Regression' ||
          //   details.template === 'AutoML'
          // ) {
          //   tasks.conjunto_dados = getPhase('filter', manifest.status.nodes);
          // } else {
          //   tasks.conjunto_dados = getPhase(
          //     'feature-temporal',
          //     manifest.status.nodes
          //   );
          // }

          tasks.conjunto_dados = 'Succeeded';

          tasks.atributos_tempo = getPhase(
            'feature-temporal',
            manifest.status.nodes
          );

          tasks.pre_selecao1 = getPhase(
            'pre-selection-1',
            manifest.status.nodes
          );

          tasks.atributos_genericos = getPhase(
            'feature-tools',
            manifest.status.nodes
          );

          tasks.pre_selecao2 = getPhase(
            'pre-selection-2',
            manifest.status.nodes
          );

          tasks.filtro_atributos = getPhase('filter', manifest.status.nodes);

          tasks.automl = getPhase('automl', manifest.status.nodes);

          tasks.regression = getPhase('regression', manifest.status.nodes);

          setTaskStatus(tasks);
        }
      }
    }

    console.log('Start polling id: ', pollingId);
    setTaskStatus(_.mapValues(taskStatus, () => 'Pending'));
    setRunStatus('Running');
    intervalPolling = setInterval(() => {
      fetchRunStatus();
    }, 3000);
  };
  // DidMount montagem das colunas
  useEffect(() => {
    let isSubscribed = true;

    async function fetchColumns() {
      // You can await here

      const responseHeader = await getHeader(details.headerId);
      if (responseHeader && isSubscribed)
        setTXT(responseHeader.data.payload.uuid);

      const col = await getHeaderColumns(details.headerId);
      if (col && isSubscribed) setColumns(col.data.payload);

      const responseDataset = await getDataSet(details.datasetId);
      if (responseDataset && isSubscribed)
        setCSV(responseDataset.data.payload.uuid);

      if (details.runId) {
        // const runRes = await getStatusRun(
        //   'fc9d173f-ede3-11e9-9413-52540006ce68'
        // );
        const runRes = await getStatusRun(details.runId);

        if (runRes) {
          console.info('[STATUS]', runRes.data.run.status);
          if (isSubscribed) setRunStatus(runRes.data.run.status);
          if (
            runRes.data.run.status === 'Running' ||
            runRes.data.run.status === undefined
          ) {
            console.info('Preparing to polling');

            if (isSubscribed) {
              setTaskStatus(_.mapValues(taskStatus, () => 'Running'));
              pollingRun(details.runId);
            }
          } else {
            const manifest = JSON.parse(
              runRes.data.pipeline_runtime.workflow_manifest
            );

            if (isSubscribed) {
              //   // feature-temporal
              //   // pre-selection-1
              //   // feature-tools
              //   // pre-selection-2
              //   // filter
              //   // automl
              //   // regression
              const tasks = { ...taskStatus };

              // if (
              //   details.template === 'Linear Regression/Logistic Regression' ||
              //   details.template === 'AutoML'
              // ) {
              //   tasks.conjunto_dados = getPhase(
              //     'filter',
              //     manifest.status.nodes
              //   );
              // } else {
              //   tasks.conjunto_dados = getPhase(
              //     'feature-temporal',
              //     manifest.status.nodes
              //   );
              // }

              if (runRes.data.run.status === 'Succeeded') {
                const resUpdate = await updateExperiment(
                  details.projectId,
                  details.uuid,
                  {
                    runStatus: 'Succeeded',
                  }
                );
                console.info(resUpdate);
              }

              tasks.conjunto_dados = 'Succeeded';

              tasks.atributos_tempo = getPhase(
                'feature-temporal',
                manifest.status.nodes
              );

              tasks.pre_selecao1 = getPhase(
                'pre-selection-1',
                manifest.status.nodes
              );

              tasks.atributos_genericos = getPhase(
                'feature-tools',
                manifest.status.nodes
              );

              tasks.pre_selecao2 = getPhase(
                'pre-selection-2',
                manifest.status.nodes
              );

              tasks.filtro_atributos = getPhase(
                'filter',
                manifest.status.nodes
              );

              tasks.automl = getPhase('automl', manifest.status.nodes);

              tasks.regression = getPhase('regression', manifest.status.nodes);

              setTaskStatus(tasks);
            }
          }
        }
      }
    }
    if (details.headerId && isSubscribed) fetchColumns();

    if (details.targetColumnId && isSubscribed) {
      if (details.targetColumnId.length > 5 && isSubscribed)
        setTarget(details.targetColumnId);
      else if (isSubscribed) setTarget(undefined);
    }

    if (details.datasetId) setDataset(details.datasetId);

    if (!details.runId) {
      setRunStatus(null);
    }

    return () => {
      isSubscribed = false;
    };
  }, []);

  // Abrir Drawer
  const openDrawer = () => {
    return _.indexOf(Object.values(selected), true) !== -1;
  };

  // Fechar Drawer
  const handleClose = async () => {
    const res = await updateExperiment(details.projectId, details.uuid, {
      parameters: JSON.stringify(experimentParameters),
    });

    if (res) setSelected(_.mapValues(selected, () => false));
  };

  // Executar
  const mountObjectRequest = async () => {
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
      const updateRes = await updateExperiment(
        details.projectId,
        details.uuid,
        {
          runId: runResponse.data.run.id,
        }
      );
      if (updateRes) {
        // await fetch();
        pollingRun(runResponse.data.run.id);
      }
    } else {
      setRunStatus(null);
    }
  };

  // Deploy
  const deployRequest = async () => {
    // Montar objeto
    const {
      atributos_tempo,
      pre_selecao1,
      pre_selecao2,
      filtro_atributos,
      automl,
      conjunto_dados,
    } = experimentParameters;

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
      const resUpdate = await updateExperiment(
        details.projectId,
        details.uuid,
        {
          runStatus: 'Deployed',
        }
      );
      if (resUpdate) fetch();
    }
  };

  // FIM DEPLOY

  // Selecioanr o Drawer certo
  const switchDrawer = () => {
    if (selected.conjunto_dados) {
      return (
        <DataSetDrawerContent
          parameter={experimentParameters.conjunto_dados}
          setTarget={setTarget}
          columns={columns}
          setColumns={setUploadedColumns}
          setDataset={setDataset}
          setCSV={setCSV}
          setTXT={setTXT}
          details={details}
          runStatus={runStatus}
          taskStatus={taskStatus.conjunto_dados}
        />
      );
    }
    if (selected.atributos_tempo) {
      return (
        <TimeAttributeCreationDrawerContent
          parameter={experimentParameters.atributos_tempo}
          dataSets={columns}
          setGroup={setGroup}
          setPeriod={setPeriod}
          runStatus={runStatus} // 'Succeeded' // {runStatus}
          taskStatus={taskStatus.atributos_tempo} // 'Succeeded' // {taskStatus.atributos_tempo}
          targetId={experimentParameters.conjunto_dados.target}
          details={details}
        />
      );
    }
    if (selected.pre_selecao1) {
      return (
        <AttributePreSelectionDrawerContent
          parameter={experimentParameters.pre_selecao1}
          preType={1}
          dataSets={columns}
          setCutoff={setCutoffPre1}
          setCorrelation={setCorrelationPre1}
          runStatus={runStatus}
          taskStatus={taskStatus.pre_selecao1}
          details={details}
        />
      );
    }
    if (selected.atributos_genericos) {
      return (
        <GenericAttributeCreationDrawerContent
          parameter={experimentParameters.atributos_tempo}
          dataSets={columns}
          setFeatureTools={setGroup}
          runStatus={runStatus} // 'Succeeded' // {runStatus}
          taskStatus={taskStatus.atributos_genericos} // 'Succeeded' // {taskStatus.atributos_genericos}
          targetId={experimentParameters.conjunto_dados.target}
          details={details}
        />
      );
    }
    if (selected.pre_selecao2) {
      return (
        <AttributePreSelectionDrawerContent
          parameter={experimentParameters.pre_selecao2}
          preType={2}
          dataSets={columns}
          setCutoff={setCutoffPre2}
          setCorrelation={setCorrelationPre2}
          runStatus={runStatus}
          taskStatus={taskStatus.pre_selecao2}
          details={details}
        />
      );
    }
    if (selected.filtro_atributos) {
      return (
        <AttributeFilterDrawerContent
          parameter={experimentParameters.filtro_atributos}
          dataSets={columns}
          setFilter={setFilter}
          runStatus={runStatus} // 'Succeeded' // {runStatus}
          taskStatus={taskStatus.filtro_atributos} // 'Succeeded' // {taskStatus.filtro_atributos}
          targetId={experimentParameters.conjunto_dados.target}
        />
      );
    }
    if (selected.automl) {
      return (
        <AutoMLDrawerContent
          parameter={experimentParameters.automl}
          dataSets={columns}
          setAutoML={setAutoML}
          runStatus={runStatus}
          taskStatus={taskStatus.automl}
          details={details}
        />
      );
    }
    if (
      selected.regression &&
      runStatus === 'Succeeded' &&
      taskStatus.regression === 'Succeeded'
    ) {
      return <ResultsDrawer hideDivider details={details} plot />;
    }

    return null;
  };

  const getTitle = () => {
    if (selected.conjunto_dados) {
      return 'Conjunto de dados';
    }
    if (selected.atributos_tempo) {
      return 'Criação de atributos por tempo';
    }
    if (selected.pre_selecao1) {
      return 'Pré-seleção de atributos';
    }
    if (selected.atributos_genericos) {
      return 'Criação de atributos genéricos';
    }
    if (selected.pre_selecao2) {
      return 'Pré-seleção de atributos';
    }
    if (selected.filtro_atributos) {
      return 'Filtro de atributos';
    }
    if (selected.automl) {
      return 'AutoML';
    }
    if (selected.regression) {
      return 'Regressão Logística';
    }
    return null;
  };

  const enableRun = () => {
    const {
      atributos_tempo: { period },
      automl: { time },
      conjunto_dados: { target, datasetId, csvName },
    } = experimentParameters;

    switch (details.template) {
      case 'AutoML':
        return Boolean(
          _.isNull(time) ||
            _.isNull(datasetId) ||
            _.isNull(csvName) ||
            _.isUndefined(target)
        );
      case 'AutoFeaturing + Linear Regression/Logistic Regression':
        return Boolean(
          _.isNull(time) ||
            _.isNull(period) ||
            _.isNull(datasetId) ||
            _.isNull(csvName) ||
            _.isUndefined(target)
        );
      case 'AutoFeaturing + AutoML':
        return Boolean(
          _.isNull(time) ||
            _.isNull(period) ||
            _.isNull(datasetId) ||
            _.isNull(csvName) ||
            _.isUndefined(target)
        );
      case 'Linear Regression/Logistic Regression':
        return Boolean(
          _.isNull(datasetId) || _.isNull(csvName) || _.isUndefined(target)
        );
      default:
        return Boolean(
          _.isNull(time) ||
            _.isNull(period) ||
            _.isNull(datasetId) ||
            _.isNull(csvName) ||
            _.isUndefined(target)
        );
    }
  };

  const executeButton = () =>
    runStatus === 'Succeeded' ? (
      <div>
        <Icon
          style={{ fontSize: '18px', color: '#389E0D', marginRight: '8px' }}
          theme='filled'
          type='check-circle'
        />
        <span>Executado</span>
      </div>
    ) : (
      <Button
        icon={
          runStatus !== 'Running' || runStatus === 'StartRun'
            ? 'play-circle'
            : 'loading'
        }
        type='primary'
        onClick={mountObjectRequest}
        disabled={
          runStatus === 'Running' ||
          (runStatus === 'Loading' && details.runId) ||
          runStatus === 'StartRun' ||
          enableRun()
        }
      >
        Executar
      </Button>
    );

  const deployButton = () =>
    details.runStatus === 'Deployed' ? (
      <div>
        <Icon
          style={{ fontSize: '18px', color: '#389E0D', marginRight: '8px' }}
          theme='filled'
          type='check-circle'
        />
        <span>Implantado</span>
      </div>
    ) : (
      <Button
        icon='tool'
        type='primary'
        disabled={runStatus !== 'Succeeded'}
        onClick={deployRequest}
      >
        Implantar
      </Button>
    );
  return (
    <div className='experiment-content'>
      <div className='experiment-content-header'>
        <EditableTitle fetchDetails={fetch} details={details} />

        {/* {details.runStatus === 'Deployed' && (
          <Paragraph
            style={{ marginBottom: 0, width: '20vw' }}
            ellipsis
            copyable
          >
            {url}
          </Paragraph>
        )} */}
        <div className='experiment-actions'>
          {details.runStatus !== 'Deployed' && executeButton()}
          {details.runStatus !== 'Deployed' && <Divider type='vertical' />}
          {deployButton()}
        </div>
      </div>
      <MainDrawer
        isOpen={openDrawer()}
        onClose={handleClose}
        isFinished={runStatus}
        title={getTitle()}
      >
        {switchDrawer()}
      </MainDrawer>
      <ExperimentFlow
        selected={selected}
        parameters={experimentParameters}
        columns={columns}
        handleClick={handleClick}
        details={details}
        taskStatus={taskStatus}
        runStatus={runStatus}
      />
    </div>
  );
};

// ExperimentContent.propTypes = {
//   details: PropTypes.shape({
//     name: PropTypes.string,
//     uuid: PropTypes.string,
//   }).isRequired,
// };

export default ExperimentContent;
