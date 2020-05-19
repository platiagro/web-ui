// CORE LIBS
import React, { useEffect } from 'react';
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
    handleRemoveOperator: (projectId, experimentId, operatorId) =>
      dispatch(removeOperatorRequest(projectId, experimentId, operatorId)),
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
    operatorId: state.operator.uuid,
    operator: state.operator,
    parameters: state.operator.parameters,
    loading: state.ui.experimentOperators.loading,
    parameterLoading: state.ui.operatorParameter.loading,
    trainingSucceeded: state.experiment.succeeded,
    trainingLoading: state.ui.experimentTraining.loading,
  };
};

/**
 * DatasetDrawer Container.
 * This component is responsible for create a logic container for drawer with
 * redux.
 */
const DatasetDrawerContainer = ({
  parameters,
  loading,
  trainingLoading,
  operator,
  operatorId,
  handleRemoveOperator,
  handleSetOperatorParameter,
  parameterLoading,
  trainingSucceeded,
}) => {
  // CONSTANTS
  // getting experiment uuid
  const { projectId, experimentId } = useParams();

  // HANDLERS
  // remove operator
  const removeOperatorHandler = () =>
    handleRemoveOperator(projectId, experimentId, operatorId);
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
      handleRemoveOperatorClick={removeOperatorHandler}
      drawerInputs={parameters}
      loading={loading}
      trainingSucceeded={trainingSucceeded}
      trainingLoading={trainingLoading}
      parameterLoading={parameterLoading}
      handleChangeParameter={setOperatorParameterHandler}
    />
  );
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetDrawerContainer);
