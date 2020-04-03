// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// COMPONENTS
import GenericDrawer from './index';

// ACTIONS
import { removeOperatorRequest } from '../../../../../../../store/operator/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    // remove operator
    handleRemoveOperator: (projectId, experimentId, operatorId) =>
      dispatch(removeOperatorRequest(projectId, experimentId, operatorId)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    operatorId: state.operator.uuid,
    loading: state.ui.experimentOperators.loading,
  };
};

/**
 * DatasetDrawer Container.
 * This component is responsible for create a logic container for drawer with
 * redux.
 */
const DatasetDrawerContainer = ({
  drawerInputs,
  drawerTip,
  loading,
  operatorId,
  handleRemoveOperator,
}) => {
  // CONSTANTS
  // getting experiment uuid
  const { projectId, experimentId } = useParams();

  // HANDLERS
  // remove operator
  const removeOperatorHandler = () =>
    handleRemoveOperator(projectId, experimentId, operatorId);

  // RENDER
  return (
    <GenericDrawer
      handleRemoveOperatorClick={removeOperatorHandler}
      loading={loading}
    />
  );
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetDrawerContainer);
