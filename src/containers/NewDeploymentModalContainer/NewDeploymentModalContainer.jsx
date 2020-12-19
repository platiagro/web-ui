// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';

// COMPONENTS
// import { NewDeploymentModal } from 'components/Modals';

// ACTIONS
import { createProjectDeployment } from 'store/projectDeployments/actions';
import { deploymentsTabsHideModal } from 'store/ui/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleCreateProjectDeployment: (projectId, experimentId, name) =>
      dispatch(createProjectDeployment(projectId, experimentId, name)),
    handleHideModal: () => dispatch(deploymentsTabsHideModal()),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    loading: state.uiReducer.deploymentsTabs.loading,
    errorMessage: state.uiReducer.deploymentsTabs.modalErrorMessage,
    validateStatus: state.uiReducer.deploymentsTabs.modalValidateStatus,
    visible: state.uiReducer.deploymentsTabs.modalVisible,
  };
};

/**
 * New Deployments modal container.
 * This component is responsible for create a logic container for new deployments modal
 * with redux.
 */
const NewDeploymentModalContainer = (props) => {
  // const {
  //   errorMessage,
  //   handleCreateProjectDeployment,
  //   handleHideModal,
  //   loading,
  //   validateStatus,
  //   visible,
  // } = props;
  const { projectId } = useParams();

  // HANDLERS
  // Verificar como escolher o experimento
  // const onConfirm = (name) => {
  //   handleCreateProjectDeployment(
  //     projectId,
  //     'f6d3019a-a739-4ee4-9c2a-eefd17f21148',
  //     name
  //   );
  // };

  // RENDER
  return (
    <>
      `TODO ${projectId}`
    </>
    // <NewDeploymentModal
    //   errorMessage={errorMessage}
    //   loading={loading}
    //   onClose={handleHideModal}
    //   onConfirm={onConfirm}
    //   validateStatus={validateStatus}
    //   visible={visible}
    // />
  );
};

// EXPORT
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewDeploymentModalContainer)
);
