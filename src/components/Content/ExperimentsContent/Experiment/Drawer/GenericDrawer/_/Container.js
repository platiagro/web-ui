// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// COMPONENTS
import GenericDrawer from './index';

// ACTIONS
import {
  removeOperatorRequest,
  setOperatorParametersRequest,
} from '../../../../../../../store/operator/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    // remove operator
    handleRemoveOperator: (projectId, experimentId, operator) =>
      dispatch(removeOperatorRequest(projectId, experimentId, operator)),
    // set operator parameter
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
    loading: state.uiReducer.experimentOperators.loading,
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
  // CONSTANTS
  const { operator, parameters, parametersLatestTraining } = props;
  const { loading, parameterLoading, trainingLoading } = props;
  const { handleRemoveOperator, handleSetOperatorParameter } = props;
  const { projectId, experimentId } = useParams();

  // HANDLERS
  // remove operator
  const removeOperatorHandler = () =>
    handleRemoveOperator(projectId, experimentId, operator);
  // set operator parameter
  const setOperatorParameterHandler = (parameterName, parameterValue) =>
    handleSetOperatorParameter(
      projectId,
      experimentId,
      operator,
      parameterName,
      parameterValue
    );

  // RENDER
  return (
    <GenericDrawer
      drawerInputs={parameters}
      loading={loading}
      trainingLoading={trainingLoading}
      parameterLoading={parameterLoading}
      parametersLatestTraining={parametersLatestTraining}
      handleChangeParameter={setOperatorParameterHandler}
      handleRemoveOperatorClick={removeOperatorHandler}
    />
  );
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GenericDrawerContainer);
