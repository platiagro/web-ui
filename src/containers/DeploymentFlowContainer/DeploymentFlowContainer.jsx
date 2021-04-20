import React from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import DeploymentFlow from 'components/DeploymentFlow';
import {
  selectOperator,
  deselectOperator,
  saveDeploymentOperatorPosition,
} from 'store/operator/actions';
import { hideLogsPanel, showLogsPanel } from 'store/ui/actions';

const operatorsSelector = ({ deploymentOperatorsReducer }) => {
  return deploymentOperatorsReducer;
};

const loadingSelector = ({ uiReducer }) => {
  return uiReducer.deploymentsTabs.deploymentOperatorsLoading;
};

const selectedOperatorIdSelector = ({ operatorReducer }) => {
  return operatorReducer.uuid;
};

const isShowingLogsPanelSelector = ({ uiReducer }) => {
  return uiReducer.logsPanel.isShowing;
};

const numberOfLogsSelector = ({ deploymentLogsReducer }) => {
  return deploymentLogsReducer.logs.length;
};

const DeploymentFlowContainer = () => {
  const { projectId, deploymentId } = useParams();
  const dispatch = useDispatch();

  const loading = useSelector(loadingSelector);
  const operators = useSelector(operatorsSelector);
  const numberOfLogs = useSelector(numberOfLogsSelector);
  const selectedOperatorId = useSelector(selectedOperatorIdSelector);
  const isShowingLogsPanel = useSelector(isShowingLogsPanelSelector);

  const handleSelectOperator = (operator) => {
    dispatch(selectOperator(operator));
  };

  const handleDeselectOperator = () => {
    dispatch(deselectOperator());
  };

  const handleSavePosition = (operatorId, position) => {
    dispatch(
      saveDeploymentOperatorPosition(
        projectId,
        deploymentId,
        operatorId,
        position
      )
    );
  };

  const handleToggleLogsPanel = () => {
    if (isShowingLogsPanel) dispatch(hideLogsPanel());
    else dispatch(showLogsPanel());
  };

  return (
    <DeploymentFlow
      loading={loading}
      operators={operators}
      numberOfLogs={numberOfLogs}
      selectedOperatorId={selectedOperatorId}
      isLogsPanelSelected={isShowingLogsPanel}
      handleSavePosition={handleSavePosition}
      handleSelectOperator={handleSelectOperator}
      handleToggleLogsPanel={handleToggleLogsPanel}
      handleDeselectOperator={handleDeselectOperator}
    />
  );
};

export default DeploymentFlowContainer;
