// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// UI LIBS
import { Empty } from 'antd';

// COMPONENTS
import { ParameterGroup, PropertyBlock } from 'components';

import { Actions as operatorActions } from 'store/operator';

const { updateExperimentOperatorRequest } = operatorActions;

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleSetOperatorParameter: (
      projectId,
      deploymentId,
      operator,
      parameterName,
      parameterValue
    ) =>
      dispatch(
        updateExperimentOperatorRequest(
          projectId,
          deploymentId,
          operator,
          parameterName,
          parameterValue
        )
      ),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    operator: state.deploymentOperatorReducer,
    parameters: state.deploymentOperatorReducer.parameters,
    parametersLatestTraining:
      state.deploymentOperatorReducer.parametersLatestTraining,
    parameterLoading: state.uiReducer.deploymentOperatorParameter.loading,
    trainingLoading: state.uiReducer.deploymentTraining.loading,
  };
};

/**
 * Deployment Properties Panel Container.
 */
const DeploymentPropertiesPanelContainer = (props) => {
  const {
    handleSetOperatorParameter,
    operator,
    parameters,
    parametersLatestTraining,
    parameterLoading,
    trainingLoading,
  } = props;
  const { projectId, deploymentId } = useParams();

  // HANDLERS
  const setOperatorParameterHandler = (parameterName, parameterValue) =>
    handleSetOperatorParameter(
      projectId,
      deploymentId,
      operator,
      parameterName,
      parameterValue
    );

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

  // rendering parameters
  return (
    <>
      {parameters.map((parameter) => {
        let valueLatestTraining = parametersLatestTraining
          ? parametersLatestTraining[parameter.name]
          : null;
        if (valueLatestTraining === undefined || valueLatestTraining === null) {
          valueLatestTraining = parameter.value;
        }
        return (
          <ParameterGroup
            loading={parameterLoading}
            onChange={setOperatorParameterHandler}
            parameter={parameter}
            trainingLoading={trainingLoading}
            valueLatestTraining={valueLatestTraining}
          />
        );
      })}
    </>
  );
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeploymentPropertiesPanelContainer);
