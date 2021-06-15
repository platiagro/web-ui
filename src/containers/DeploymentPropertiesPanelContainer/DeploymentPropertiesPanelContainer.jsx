import React from 'react';
import { Empty } from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ParameterGroup, PropertyBlock } from 'components';
import { updateExperimentOperatorRequest } from 'store/operator';

const operatorSelector = ({ deploymentOperatorReducer }) => {
  return deploymentOperatorReducer;
};

const parametersSelector = ({ deploymentOperatorReducer }) => {
  return deploymentOperatorReducer.parameters;
};

const trainingLoadingSelector = ({ uiReducer }) => {
  return uiReducer.deploymentTraining.loading;
};

const parameterLoadingSelector = ({ uiReducer }) => {
  return uiReducer.deploymentOperatorParameter.loading;
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
  const parameterLoading = useSelector(parameterLoadingSelector);
  const parametersLatestTraining = useSelector(
    parametersLatestTrainingSelector
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

  if (parameters && parameters.length === 0) {
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

        if (valueLatestTraining === undefined || valueLatestTraining === null) {
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
