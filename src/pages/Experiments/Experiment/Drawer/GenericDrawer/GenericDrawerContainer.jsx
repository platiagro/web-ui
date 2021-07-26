import React from 'react';
import { Empty } from 'antd';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { useIsLoading } from 'hooks';
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

const GenericDrawerContainer = () => {
  const { projectId, experimentId } = useParams();
  const dispatch = useDispatch();

  const operator = useSelector(operatorSelector);
  const parameters = useSelector(parametersSelector);
  const trainingLoading = useSelector(trainingLoadingSelector);
  const parametersLatestTraining = useSelector(
    parametersLatestTrainingSelector
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

  // para adicionar o loading em cada parametro, precisamos
  // renderizar cada parametro como se fosse um container
  //
  // desativamos o eslint para não ficar exigindo proptypes para esse container
  /* eslint-disable */
  const OperatorParameter = ({ parameterData }) => {
    const loadingString = `${operator.uuid}-${parameterData.name}`;

    const parameterLoading = useIsLoading(
      OPERATORS_TYPES.CLEAR_OPERATORS_FEATURE_PARAMETERS_REQUEST,
      loadingString
    );

    const valueLatestTraining = parametersLatestTraining
      ? parametersLatestTraining[parameterData.name]
      : parameterData.value;

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
