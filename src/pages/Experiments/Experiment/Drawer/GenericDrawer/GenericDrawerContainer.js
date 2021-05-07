// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// UI LIBS
import { Empty } from 'antd';

// COMPONENTS
import { ParameterGroup, PropertyBlock } from 'components';

// ACTIONS
import { setOperatorParametersRequest } from 'store/operator/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleSetOperatorParameter: (
      projectId,
      experimentId,
      operator,
      parameterName,
      parameterValue
    ) =>
      dispatch(
        setOperatorParametersRequest(
          projectId,
          experimentId,
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
    operator: state.operatorReducer,
    parameters: state.operatorReducer.parameters,
    parametersLatestTraining: state.operatorReducer.parametersLatestTraining,
    parameterLoading: state.uiReducer.operatorParameter.loading,
    trainingLoading: state.uiReducer.experimentTraining.loading,
  };
};

/**
 * Generic Drawer Container.
 * This component is responsible for create a logic container for drawer with
 * redux.
 */
const GenericDrawerContainer = (props) => {
  const {
    handleSetOperatorParameter,
    operator,
    parameters,
    parametersLatestTraining,
    parameterLoading,
    trainingLoading,
  } = props;
  const { projectId, experimentId } = useParams();

  // HANDLERS
  const setOperatorParameterHandler = (parameterName, parameterValue) =>
    handleSetOperatorParameter(
      projectId,
      experimentId,
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
)(GenericDrawerContainer);
