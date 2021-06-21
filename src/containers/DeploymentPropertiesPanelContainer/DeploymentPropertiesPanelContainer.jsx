import React from 'react';
import { Empty } from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useIsLoading } from 'hooks';
import { OPERATORS_TYPES } from 'store/operators';
import { ParameterGroup, PropertyBlock } from 'components';
import {
  OPERATOR_TYPES,
  updateExperimentOperatorRequest,
} from 'store/operator';

const operatorSelector = ({ deploymentOperatorReducer }) => {
  return deploymentOperatorReducer;
};

const parametersSelector = ({ deploymentOperatorReducer }) => {
  return deploymentOperatorReducer.parameters;
};

const trainingLoadingSelector = ({ uiReducer }) => {
  return uiReducer.deploymentTraining.loading;
};

const parametersLatestTrainingSelector = ({ deploymentOperatorReducer }) => {
  return deploymentOperatorReducer.parametersLatestTraining;
};

const DeploymentPropertiesPanelContainer = () => {
  const { projectId, deploymentId } = useParams();
  const dispatch = useDispatch();

  const operator = useSelector(operatorSelector);
  const parameters = useSelector(parametersSelector);
  const trainingLoading = useSelector(trainingLoadingSelector);
  const parametersLatestTraining = useSelector(
    parametersLatestTrainingSelector
  );

  const parameterLoading = useIsLoading(
    OPERATORS_TYPES.CLEAR_OPERATORS_FEATURE_PARAMETERS_REQUEST,
    OPERATOR_TYPES.UPDATE_OPERATOR_REQUEST
  );

  const setOperatorParameterHandler = (parameterName, parameterValue) => {
    dispatch(
      updateExperimentOperatorRequest(
        projectId,
        deploymentId,
        operator,
        parameterName,
        parameterValue
      )
    );
  };

  if (!parameters?.length) {
    return (
      <PropertyBlock>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description='Não há parâmetros para configuração'
        />
      </PropertyBlock>
    );
  }

  return (
    <>
      {parameters.map((parameter, index) => {
        let valueLatestTraining = parametersLatestTraining
          ? parametersLatestTraining[parameter.name]
          : null;

        if (!valueLatestTraining) {
          valueLatestTraining = parameter.value;
        }

        return (
          <ParameterGroup
            key={`parameter-${index}`}
            parameter={parameter}
            loading={parameterLoading}
            trainingLoading={trainingLoading}
            onChange={setOperatorParameterHandler}
            valueLatestTraining={valueLatestTraining}
          />
        );
      })}
    </>
  );
};

export default DeploymentPropertiesPanelContainer;
