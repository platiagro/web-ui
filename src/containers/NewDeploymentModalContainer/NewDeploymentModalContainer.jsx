import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';

import { NewDeploymentModal as NewDeploymentModalComponent } from 'components';

import { hideNewDeploymentModal } from 'store/ui/actions';
import { createDeploymentRequest } from 'store/deployments/actions';

import { Actions as experimentsActions } from 'store/experiments';
import { fetchTemplatesRequest } from 'store/templates/actions';

const { fetchExperimentsRequest } = experimentsActions;

/**
 * New deployment modal container
 */
function NewDeploymentModalContainer() {
  const dispatchHook = useDispatch();
  const { projectId } = useParams();

  // did mount hook
  useEffect(() => {
    dispatchHook(fetchExperimentsRequest(projectId));
    dispatchHook(fetchTemplatesRequest(projectId));
  }, [dispatchHook, projectId]);

  const handleConfirm = (selectedType, selectedUuid, dispatch) => {
    let experimentId = selectedType === 'experiment' ? selectedUuid : undefined;
    let templateId = selectedType === 'template' ? selectedUuid : undefined;

    return dispatch(
      createDeploymentRequest(projectId, experimentId, templateId)
    );
  };

  const mapDispatchToProps = (dispatch) => ({
    onCancel: () => dispatch(hideNewDeploymentModal()),
    onConfirm: (selectedType, selectedUuid) =>
      handleConfirm(selectedType, selectedUuid, dispatch),
  });

  const mapStateToProps = (state) => {
    return {
      visible: state.uiReducer.newDeploymentModal.visible,
      loading: state.uiReducer.newDeploymentModal.loading,
      templatesLoading: state.uiReducer.template.loading,
      experimentsLoading: state.uiReducer.experimentsTabs.loading,
      experimentsData: state.experimentsReducer,
      templatesData: state.templatesReducer,
    };
  };

  const Container = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(NewDeploymentModalComponent)
  );

  return <Container />;
}

export default NewDeploymentModalContainer;
