import React from 'react';
import { Empty } from 'antd';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { ParameterGroup, PropertyBlock } from 'components';
import { setOperatorParametersRequest } from 'store/operator/actions';

const operatorSelector = ({ operatorReducer }) => {
  return operatorReducer;
};

const parametersSelector = ({ operatorReducer }) => {
  return operatorReducer.parameters;
};

const trainingLoadingSelector = ({ uiReducer }) => {
  return uiReducer.experimentTraining.loading;
};

const parameterLoadingSelector = ({ uiReducer }) => {
  return uiReducer.operatorParameter.loading;
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
  const parameterLoading = useSelector(parameterLoadingSelector);
  const parametersLatestTraining = useSelector(
    parametersLatestTrainingSelector
  );

  const setOperatorParameterHandler = (parameterName, parameterValue) => {
    dispatch(
      setOperatorParametersRequest(
        projectId,
        experimentId,
        operator,
        parameterName,
        parameterValue
      )
    );
  };

  if (!parameters || parameters.length === 0) {
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
        const valueLatestTraining = parametersLatestTraining
          ? parametersLatestTraining[parameter.name]
          : parameter.value;

        return (
          <ParameterGroup
            key={index}
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

export default GenericDrawerContainer;
