import React from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import DeploymentFlow from 'components/DeploymentFlow';
import { saveOperatorPosition, selectOperator } from 'store/operator/actions';

const operatorsSelector = ({ deploymentOperatorsReducer }) => {
  return deploymentOperatorsReducer;
};

const loadingSelector = ({ uiReducer }) => {
  return uiReducer.deploymentsTabs.deploymentOperatorsLoading;
};

const DeploymentFlowContainer = () => {
  const { projectId, deploymentId } = useParams();
  const dispatch = useDispatch();

  const operators = useSelector(operatorsSelector);
  const loading = useSelector(loadingSelector);

  const handleSavePosition = (operatorId, position) => {
    dispatch(
      saveOperatorPosition(projectId, deploymentId, operatorId, position)
    );
  };

  const handleClickCard = (operator) => {
    dispatch(selectOperator(projectId, deploymentId, operator));
  };

  return (
    <DeploymentFlow
      operators={operators}
      loading={loading}
      handleSavePosition={handleSavePosition}
      handleClickCard={handleClickCard}
    />
  );
};

export default DeploymentFlowContainer;
