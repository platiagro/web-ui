import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStoreState } from 'react-flow-renderer';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectOperatorAndGetData,
  deselectOperator,
  saveOperatorPosition,
  saveOperatorDependencies,
} from 'store/operator/actions';
import { fetchExperimentRunStatusRequest } from 'store/experiments/experimentRuns/actions';

import ExperimentFlow from './index';
import { hideLogsPanel, showLogsPanel } from 'store/ui/actions';

const operatorsSelector = ({ operatorsReducer }) => {
  return operatorsReducer;
};

const loadingSelector = ({ uiReducer }) => {
  return uiReducer.experimentOperators.loading;
};

const arrowConfigsSelector = ({ uiReducer }) => {
  return uiReducer.operatorsDependencies;
};

const isShowingLogsPanelSelector = ({ uiReducer }) => {
  return uiReducer.logsPanel.isShowing;
};

const ExperimentFlowContainer = () => {
  const dispatch = useDispatch();
  const { projectId, experimentId } = useParams();

  const loading = useSelector(loadingSelector);
  const operators = useSelector(operatorsSelector);
  const arrowConfigs = useSelector(arrowConfigsSelector);
  const isShowingLogsPanel = useSelector(isShowingLogsPanelSelector);
  const transformations = useStoreState((flowStore) => flowStore.transform);

  const selectOperatorHandler = (operator) => {
    dispatch(selectOperatorAndGetData(projectId, experimentId, operator));
  };

  const handleSavePosition = (operatorId, position) => {
    dispatch(
      saveOperatorPosition(projectId, experimentId, operatorId, position)
    );
  };

  const handleSaveDependencies = (operatorId, dependencies) => {
    dispatch(
      saveOperatorDependencies(
        projectId,
        experimentId,
        operatorId,
        dependencies,
        operators
      )
    );
  };

  const handleDeselectOperator = () => {
    dispatch(deselectOperator());
  };

  const handleToggleLogsPanel = () => {
    if (isShowingLogsPanel) dispatch(hideLogsPanel());
    else dispatch(showLogsPanel());
  };

  useEffect(() => {
    const polling = setInterval(() => {
      dispatch(fetchExperimentRunStatusRequest(projectId, experimentId));
    }, 5000);

    return () => clearInterval(polling);
  });

  return (
    <ExperimentFlow
      numberOfLogs={0}
      tasks={operators}
      loading={loading}
      arrowConfigs={arrowConfigs}
      transformations={transformations}
      isLogsPanelSelected={isShowingLogsPanel}
      handleSavePosition={handleSavePosition}
      handleTaskBoxClick={selectOperatorHandler}
      handleToggleLogsPanel={handleToggleLogsPanel}
      handleSaveDependencies={handleSaveDependencies}
      handleDeselectOperator={handleDeselectOperator}
    />
  );
};

export default ExperimentFlowContainer;
