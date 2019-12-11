/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import './style.scss';
import { Button, Divider, message, Icon, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import EditableTitle from '../EditableTitle';
import ExperimentFlow from '../ExperimentFlow';
import MainDrawer from '../Drawer/MainDrawer';
import { showDrawer, selectDrawer } from '../../store/actions/drawerActions';
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

import deployRequest from './deployRequest';
import pollingRun from './polling';
import mountObjectRequest from './mountObjectRequest';
import taskGetPhases from './util';

const { Paragraph } = Typography;

const ExperimentContent = ({
  details,
  flowDetails,
  fetch,
  projectName,
  onShowDrawer,
  onSelectDrawer,
}) => {
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

  // getting drawer title
  const getTitle = (task) => {
    switch (task) {
      case 'conjunto_dados':
        return 'Conjunto de dados';
      case 'atributos_tempo':
        return 'Criação de atributos por tempo';
      case 'pre_selecao1':
        return 'Pré-seleção de atributos';
      case 'atributos_genericos':
        return 'Criação de atributos genéricos';
      case 'pre_selecao2':
        return 'Pré-seleção de atributos';
      case 'filtro_atributos':
        return 'Filtro de atributos';
      case 'automl':
        return 'AutoML';
      case 'regression':
        return 'Regressão Logística';
      default:
        return null;
    }
  };

  // getting drawer child
  // Selecioanr o Drawer certo
  const getChild = (task) => {
    switch (task) {
      case 'conjunto_dados':
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
      case 'atributos_tempo':
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
      case 'pre_selecao1':
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
      case 'atributos_genericos':
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
      case 'pre_selecao2':
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
      case 'filtro_atributos':
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
      case 'automl':
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
      default:
        return null;
    }
    // NÃO REMOVER
    // if (
    //   selected.regression &&
    //   runStatus === 'Succeeded' &&
    //   taskStatus.regression === 'Succeeded'
    // ) {
    //   return <ResultsDrawer hideDivider details={details} plot />;
    // }
  };

  // Click para abrir drawer de cada tarefa
  const handleClick = (task) => {
    let newSelected = { ...selected };
    newSelected = _.mapValues(selected, (value, key) => {
      if (key === task) return !value;
      return false;
    });

    setSelected(newSelected);

    const drawerTitle = getTitle(task);
    const drawerChild = getChild(task);
    const drawerContent = { title: drawerTitle, children: drawerChild };

    onSelectDrawer(drawerContent);
    onShowDrawer();
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
              pollingRun(
                details,
                details.runId,
                taskStatus,
                setTaskStatus,
                setRunStatus
              );
            }
          } else {
            const manifest = JSON.parse(
              runRes.data.pipeline_runtime.workflow_manifest
            );

            if (isSubscribed) {
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

              const tasks = taskGetPhases(taskStatus, manifest);
              console.log(tasks);
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
        onClick={() => {
          mountObjectRequest(
            columns,
            details,
            experimentParameters,
            setRunStatus,
            taskStatus,
            setTaskStatus
          );
        }}
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
        onClick={() => {
          deployRequest(columns, details, experimentParameters, projectName);
        }}
      >
        Implantar
      </Button>
    );

  const updateExperimenttName = async (
    editableDetails,
    newName,
    resultCallback
  ) => {
    const { uuid, projectId } = editableDetails;
    const response = await updateExperiment(projectId, uuid, { name: newName });
    if (response) {
      fetch();
    } else {
      resultCallback(false);
    }
  };

  return (
    <div className='experiment-content'>
      <div className='experiment-content-header'>
        <EditableTitle details={details} onUpdate={updateExperimenttName} />

        <div className='experiment-actions'>
          {details.runStatus !== 'Deployed' && executeButton()}
          {details.runStatus !== 'Deployed' && <Divider type='vertical' />}
          {deployButton()}
        </div>
      </div>
      <MainDrawer onClose={handleClose} isFinished={runStatus} />
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

const mapDispatchToProps = (dispatch) => ({
  onShowDrawer: () => dispatch(showDrawer()),
  onSelectDrawer: (drawerContent) => dispatch(selectDrawer(drawerContent)),
});

export default connect(
  null,
  mapDispatchToProps
)(ExperimentContent);
