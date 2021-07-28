import React from 'react';
import { Empty } from 'antd';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { useIsLoading, useDeepEqualSelector } from 'hooks';
import { OPERATORS_TYPES } from 'store/operators';
import { ParameterGroup, PropertyBlock } from 'components';
import { updateExperimentOperatorParameterRequest } from 'store/operator';

const operatorSelector = ({ operatorReducer }) => {
  return operatorReducer;
};

const parametersSelector = ({ operatorReducer }) => {
  return operatorReducer.parameters;
};

const trainingLoadingSelector = ({ uiReducer }) => {
  return uiReducer.experimentTraining.loading;
};

const parametersLatestTrainingSelector = ({ operatorReducer }) => {
  return operatorReducer.parametersLatestTraining;
};

// para adicionar o loading em cada parametro, precisamos
// renderizar cada parametro como se fosse um container
//
// desativamos o eslint para não ficar exigindo proptypes para esse container
/* eslint-disable */
const OperatorParameter = ({ parameterData }) => {
  const { projectId, experimentId } = useParams();

  const dispatch = useDispatch();

  const trainingLoading = useSelector(trainingLoadingSelector);
  const parametersLatestTraining = useSelector(
    parametersLatestTrainingSelector
  );
  const operator = useDeepEqualSelector(operatorSelector);

  const loadingString = `${operator.uuid}-${parameterData.name}`;

  const valueLatestTraining = parametersLatestTraining
    ? parametersLatestTraining[parameterData.name]
    : parameterData.value;

  const parameterLoading = useIsLoading(
    OPERATORS_TYPES.CLEAR_OPERATORS_FEATURE_PARAMETERS_REQUEST,
    loadingString
  );

  const setOperatorParameterHandler = (parameterName, parameterValue) => {
    dispatch(
      updateExperimentOperatorParameterRequest(
        projectId,
        experimentId,
        operator,
        parameterName,
        parameterValue
      )
    );
  };

  return (
    <ParameterGroup
      parameter={parameterData}
      loading={parameterLoading}
      trainingLoading={trainingLoading}
      onChange={setOperatorParameterHandler}
      valueLatestTraining={valueLatestTraining}
    />
  );
};
/* eslint-enable */

const GenericDrawerContainer = () => {
  const parameters = useDeepEqualSelector(parametersSelector);

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
        return <OperatorParameter key={index} parameterData={parameter} />;
      })}
    </>
  );
};

export default GenericDrawerContainer;
