import React from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import DeploymentFlow from 'components/DeploymentFlow';
import {
  selectOperator,
  deselectOperator,
  saveOperatorPosition,
  saveOperatorDependencies,
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

  console.log(selectedOperatorId);

  const handleSavePosition = (operatorId, position) => {
    dispatch(
      saveOperatorPosition(projectId, deploymentId, operatorId, position)
    );
  };

  const handleSelectOperator = (operator) => {
    dispatch(selectOperator(operator));
  };

  const handleSaveDependencies = (operatorId, dependencies) => {
    dispatch(
      saveOperatorDependencies(
        projectId,
        deploymentId,
        operatorId,
        dependencies,
        operators
      )
    );
  };

  const handleDeselectOperator = () => {
    dispatch(deselectOperator());
  };

  return (
    <DeploymentFlow
      loading={loading}
      operators={operators}
      selectedOperatorId={selectedOperatorId}
      handleSavePosition={handleSavePosition}
      handleSelectOperator={handleSelectOperator}
      handleDeselectOperator={handleDeselectOperator}
      handleSaveDependencies={handleSaveDependencies}
    />
  );
};

export default DeploymentFlowContainer;
