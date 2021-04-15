import React from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import DeploymentFlow from 'components/DeploymentFlow';
import {
  selectOperator,
  deselectOperator,
  saveDeploymentOperatorPosition,
} from 'store/operator/actions';

const operatorsSelector = ({ deploymentOperatorsReducer }) => {
  return deploymentOperatorsReducer;
};

const loadingSelector = ({ uiReducer }) => {
  return uiReducer.deploymentsTabs.deploymentOperatorsLoading;
};

const selectedOperatorIdSelector = ({ operatorReducer }) => {
  return operatorReducer.uuid;
};

const DeploymentFlowContainer = () => {
  const { projectId, deploymentId } = useParams();
  const dispatch = useDispatch();

  const loading = useSelector(loadingSelector);
  const operators = useSelector(operatorsSelector);
  const selectedOperatorId = useSelector(selectedOperatorIdSelector);

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

  return (
    <DeploymentFlow
      loading={loading}
      operators={operators}
      selectedOperatorId={selectedOperatorId}
      handleSavePosition={handleSavePosition}
      handleSelectOperator={handleSelectOperator}
      handleDeselectOperator={handleDeselectOperator}
    />
  );
};

export default DeploymentFlowContainer;
