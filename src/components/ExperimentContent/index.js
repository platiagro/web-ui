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
  setCsv,
  setTxt,
  setTarget,
  setDataset,
} from '../../store/actions/experimentActions';

const ExperimentContent = (props) => {
  const {
    columns,
    details,
    parameters,
    fetch,
    projectName,
    runStatus,
    selected,
    taskStatus,
  } = props;

  const {
    onShowDrawer,
    onSelectDrawer,
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

  // DidMount montagem das colunas
  useEffect(() => {
    let isSubscribed = true;

    async function fetchColumns() {
      // You can await here

      const responseHeader = await getHeader(details.headerId);
      if (responseHeader && isSubscribed)
        onSetTxt(responseHeader.data.payload.uuid);

      const col = await getHeaderColumns(details.headerId);
      if (col && isSubscribed) onSetColumns(col.data.payload);

      const responseDataset = await getDataSet(details.datasetId);
      if (responseDataset && isSubscribed)
        onSetCsv(responseDataset.data.payload.uuid);

      if (details.runId) {
        const runRes = await getStatusRun(details.runId);

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
                details.runId,
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
              onSetTaskStatus(tasks);
            }
          }
        }
      }
    }
    if (details.headerId && isSubscribed) fetchColumns();

    if (details.targetColumnId && isSubscribed) {
      if (details.targetColumnId.length > 5 && isSubscribed)
        onSetTarget(details.targetColumnId);
      else if (isSubscribed) onSetTarget(undefined);
    }

    if (details.datasetId) onSetDataset(details.datasetId);

    if (!details.runId) {
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
    const res = await updateExperiment(details.projectId, details.uuid, {
      parameters: JSON.stringify(parameters),
    });

    if (res) onSetSelectedDrawer(_.mapValues(selected, () => false));
  };

  const enableRun = () => {
    const {
      atributos_tempo: { period },
      automl: { time },
      conjunto_dados: { target, datasetId, csvName },
    } = parameters;

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
            parameters,
            onSetRunStatus,
            taskStatus,
            onSetTaskStatus
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
          {details.runStatus !== 'Deployed' && executeButton()}
          {details.runStatus !== 'Deployed' && <Divider type='vertical' />}
          {deployButton()}
        </div>
      </div>
      <MainDrawer onClose={handleClose} isFinished={runStatus} />
      <ExperimentFlow />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    columns: state.experiment.columns,
    runStatus: state.experiment.runStatus,
    parameters: state.experiment.parameters,
    selected: state.experiment.selected,
    taskStatus: state.experiment.taskStatus,
  };
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
  onSetCsv: (csv) => {
    dispatch(setCsv(csv));
  },
  onSetTxt: (txt) => {
    dispatch(setTxt(txt));
  },
  onSetTarget: (target) => {
    dispatch(setTarget(target));
  },
  onSetDataset: (dataset) => {
    dispatch(setDataset(dataset));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentContent);
