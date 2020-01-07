/* eslint-disable no-unused-vars */
import './style.scss';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Button, Divider, Icon } from 'antd';
import EditableTitle from '../EditableTitle';
import ExperimentFlow from '../ExperimentFlow';
import MainDrawer from '../Drawer/MainDrawer';

import { updateExperiment } from '../../services/projectsApi';
import { getStatusRun } from '../../services/pipelinesApi';
import {
  getHeader,
  getHeaderColumns,
  getDataSet,
} from '../../services/dataSetApi';

import deployRequest from './deployRequest';
import pollingRun from './polling';
import mountObjectRequest from './mountObjectRequest';
import taskGetPhases from './util';

import { showDrawer, selectDrawer } from '../../store/actions/drawerActions';

import {
  updateExperimentName,
  setColumns,
  setRunStatus,
  setSelectedDrawer,
  setTaskStatus,
  setTarget,
} from '../../store/actions/experimentActions';

const ExperimentContent = (props) => {
  const {
    uuid,
    projectId,
    targetColumnId,
    columns,
    headerId,
    datasetId,
    runId,
    template,
    parameters,
    projectName,
    runStatus,
    selected,
    taskStatus,
    details,
  } = props;

  const {
    onUpdateExperimentName,
    onSetColumns,
    onSetRunStatus,
    onSetSelectedDrawer,
    onSetTaskStatus,
    onSetCsv,
    onSetTxt,
    onSetTarget,
    onSetDataset,
  } = props;

  // daqui
  // const params = useParams();

  // const setUploadedColumns = (e) => {
  //   console.log(e);
  //   onSetColumns(e);
  // };

  // // getting drawer title
  // const getTitle = (task) => {
  //   switch (task) {
  //     case 'conjunto_dados':
  //       return 'Conjunto de dados';
  //     case 'atributos_tempo':
  //       return 'Criação de atributos por tempo';
  //     case 'pre_selecao1':
  //       return 'Pré-seleção de atributos';
  //     case 'atributos_genericos':
  //       return 'Criação de atributos genéricos';
  //     case 'pre_selecao2':
  //       return 'Pré-seleção de atributos';
  //     case 'filtro_atributos':
  //       return 'Filtro de atributos';
  //     case 'automl':
  //       return 'AutoML';
  //     case 'regression':
  //       return 'Regressão Logística';
  //     default:
  //       return null;
  //   }
  // };

  // // getting drawer child
  // // Selecioanr o Drawer certo
  // const getChild = (task) => {
  //   switch (task) {
  //     case 'conjunto_dados':
  //       return (
  //         <DataSetDrawer
  //           parameter={experimentParameters.conjunto_dados}
  //           setTarget={onSetTarget}
  //           columns={columns}
  //           setColumns={setUploadedColumns}
  //           setDataset={onSetDataset}
  //           setCSV={onSetCsv}
  //           setTXT={onSetTxt}
  //           details={details}
  //           runStatus={runStatus}
  //           taskStatus={taskStatus.conjunto_dados}
  //         />
  //       );
  //     case 'atributos_tempo':
  //       return (
  //         <TimeAttributeCreationDrawerContent
  //           parameter={experimentParameters.atributos_tempo}
  //           dataSets={columns}
  //           setGroup={onSetGroup}
  //           setPeriod={onSetPeriod}
  //           runStatus={runStatus} // 'Succeeded' // {runStatus}
  //           taskStatus={taskStatus.atributos_tempo} // 'Succeeded' // {taskStatus.atributos_tempo}
  //           targetId={experimentParameters.conjunto_dados.target}
  //           details={details}
  //         />
  //       );
  //     case 'pre_selecao1':
  //       return (
  //         <AttributePreSelectionDrawerContent
  //           parameter={experimentParameters.pre_selecao1}
  //           preType={1}
  //           dataSets={columns}
  //           setCutoff={onSetCutoffPre1}
  //           setCorrelation={onSetCorrelationPre1}
  //           runStatus={runStatus}
  //           taskStatus={taskStatus.pre_selecao1}
  //           details={details}
  //         />
  //       );
  //     case 'atributos_genericos':
  //       return (
  //         <GenericAttributeCreationDrawerContent
  //           parameter={experimentParameters.atributos_tempo}
  //           dataSets={columns}
  //           setFeatureTools={onSetGroup}
  //           runStatus={runStatus} // 'Succeeded' // {runStatus}
  //           taskStatus={taskStatus.atributos_genericos} // 'Succeeded' // {taskStatus.atributos_genericos}
  //           targetId={experimentParameters.conjunto_dados.target}
  //           details={details}
  //         />
  //       );
  //     case 'pre_selecao2':
  //       return (
  //         <AttributePreSelectionDrawerContent
  //           parameter={experimentParameters.pre_selecao2}
  //           preType={2}
  //           dataSets={columns}
  //           setCutoff={onSetCutoffPre2}
  //           setCorrelation={onSetCorrelationPre2}
  //           runStatus={runStatus}
  //           taskStatus={taskStatus.pre_selecao2}
  //           details={details}
  //         />
  //       );
  //     case 'filtro_atributos':
  //       return (
  //         <AttributeFilterDrawerContent
  //           parameter={experimentParameters.filtro_atributos}
  //           dataSets={columns}
  //           setFilter={onSetFilter}
  //           runStatus={runStatus} // 'Succeeded' // {runStatus}
  //           taskStatus={taskStatus.filtro_atributos} // 'Succeeded' // {taskStatus.filtro_atributos}
  //           targetId={experimentParameters.conjunto_dados.target}
  //         />
  //       );
  //     case 'automl':
  //       return (
  //         <AutoMLDrawerContent
  //           parameter={experimentParameters.automl}
  //           dataSets={columns}
  //           setAutoML={onSetAutoML}
  //           runStatus={runStatus}
  //           taskStatus={taskStatus.automl}
  //           details={details}
  //         />
  //       );
  //     default:
  //       return null;
  //   }
  //   // NÃO REMOVER
  //   // if (
  //   //   selected.regression &&
  //   //   runStatus === 'Succeeded' &&
  //   //   taskStatus.regression === 'Succeeded'
  //   // ) {
  //   //   return <ResultsDrawer hideDivider details={details} plot />;
  //   // }
  // };

  // // Click para abrir drawer de cada tarefa
  // const handleClick = (task) => {
  //   let newSelected = { ...selected };
  //   newSelected = _.mapValues(selected, (value, key) => {
  //     if (key === task) return !value;
  //     return false;
  //   });

  //   onSetSelectedDrawer(newSelected);

  //   const drawerTitle = getTitle(task);
  //   const drawerChild = getChild(task);
  //   const drawerContent = { title: drawerTitle, children: drawerChild };

  //   onSelectDrawer(drawerContent);
  //   onShowDrawer();
  // };
  // até aqui
  // DidMount montagem das colunas
  useEffect(() => {
    let isSubscribed = true;

    async function fetchColumns() {
      // You can await here

      const responseHeader = await getHeader(headerId);
      // if (responseHeader && isSubscribed)
      //   onSetTxt(responseHeader.data.payload.uuid);

      const col = await getHeaderColumns(headerId);
      if (col && isSubscribed) onSetColumns(col.data.payload);

      const responseDataset = await getDataSet(datasetId);
      // if (responseDataset && isSubscribed)
      //   onSetCsv(responseDataset.data.payload.uuid);

      if (runId) {
        const runRes = await getStatusRun(runId);

        if (runRes) {
          console.info('[STATUS]', runRes.data.run.status);
          if (isSubscribed) onSetRunStatus(runRes.data.run.status);
          if (
            runRes.data.run.status === 'Running' ||
            runRes.data.run.status === undefined
          ) {
            console.info('Preparing to polling');

            if (isSubscribed) {
              onSetTaskStatus(_.mapValues(taskStatus, () => 'Running'));
              pollingRun(
                details,
                runId,
                taskStatus,
                onSetTaskStatus,
                onSetRunStatus
              );
            }
          } else {
            const manifest = JSON.parse(
              runRes.data.pipeline_runtime.workflow_manifest
            );

            if (isSubscribed) {
              if (runRes.data.run.status === 'Succeeded') {
                const resUpdate = await updateExperiment(projectId, uuid, {
                  runStatus: 'Succeeded',
                });
                console.info(resUpdate);
              }

              const tasks = taskGetPhases(taskStatus, manifest);
              console.log(tasks);
              onSetTaskStatus(tasks);
            }
          }
        }
      }
    }
    if (headerId && isSubscribed) fetchColumns();

    if (targetColumnId && isSubscribed) {
      if (targetColumnId.length > 5 && isSubscribed)
        onSetTarget(targetColumnId);
      else if (isSubscribed) onSetTarget(undefined);
    }

    // if (datasetId) onSetDataset(datasetId);

    if (!runId) {
      onSetRunStatus(null);
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
    const res = await updateExperiment(projectId, uuid, {
      parameters: JSON.stringify(parameters),
    });

    if (res) onSetSelectedDrawer(_.mapValues(selected, () => false));
  };

  const enableRun = () => {
    const {
      atributos_tempo: { period },
      automl: { time },
      conjunto_dados: { target, csvName },
    } = parameters;

    switch (template) {
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
            parameters,
            onSetRunStatus,
            taskStatus,
            onSetTaskStatus
          );
        }}
        disabled={
          runStatus === 'Running' ||
          (runStatus === 'Loading' && runId) ||
          runStatus === 'StartRun' ||
          enableRun()
        }
      >
        Executar
      </Button>
    );

  const deployButton = () =>
    runStatus === 'Deployed' ? (
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
          deployRequest(columns, details, parameters, projectName);
        }}
      >
        Implantar
      </Button>
    );

  return (
    <div className='experiment-content'>
      <div className='experiment-content-header'>
        <EditableTitle details={details} onUpdate={onUpdateExperimentName} />

        <div className='experiment-actions'>
          {runStatus !== 'Deployed' && executeButton()}
          {runStatus !== 'Deployed' && <Divider type='vertical' />}
          {deployButton()}
        </div>
      </div>
      <MainDrawer onClose={handleClose} isFinished={runStatus} />
      <ExperimentFlow />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { ...state.experiment, details: state.experiment };
};

const mapDispatchToProps = (dispatch) => ({
  onShowDrawer: () => dispatch(showDrawer()),
  onSelectDrawer: (drawerContent) => dispatch(selectDrawer(drawerContent)),
  onUpdateExperimentName: (editableDetails, name) => {
    return dispatch(updateExperimentName(editableDetails, name));
  },
  onSetColumns: (columns) => {
    dispatch(setColumns(columns));
  },
  onSetRunStatus: (status) => {
    dispatch(setRunStatus(status));
  },
  onSetSelectedDrawer: (selectedDrawer) => {
    dispatch(setSelectedDrawer(selectedDrawer));
  },
  onSetTaskStatus: (taskStatus) => {
    dispatch(setTaskStatus(taskStatus));
  },
  onSetTarget: (target) => {
    dispatch(setTarget(target));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ExperimentContent);
