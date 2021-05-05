import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

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
  const dispatch = useDispatch();
  const { projectId } = useParams();

  // TODO: Criar seletores
  /* eslint-disable */
  const visible = useSelector(
    (state) => state.uiReducer.newDeploymentModal.visible
  );
  const loading = useSelector(
    (state) => state.uiReducer.newDeploymentModal.loading
  );
  const templatesLoading = useSelector(
    (state) => state.uiReducer.template.loading
  );
  const experimentsLoading = useSelector(
    (state) => state.uiReducer.experimentsTabs.loading
  );
  const experimentsData = useSelector((state) => state.experimentsReducer);
  const templatesData = useSelector((state) => state.templatesReducer);
  /* eslint-enable */

  const handleConfirm = (selectedType, selectedUuid) => {
    let experimentId = selectedType === 'experiment' ? selectedUuid : undefined;
    let templateId = selectedType === 'template' ? selectedUuid : undefined;

    dispatch(createDeploymentRequest(projectId, experimentId, templateId));
  };
  const handleCancel = () => dispatch(hideNewDeploymentModal());

  // did mount hook
  useEffect(() => {
    dispatch(fetchExperimentsRequest(projectId));
    dispatch(fetchTemplatesRequest(projectId));
  }, [dispatch, projectId]);

  return (
    <NewDeploymentModalComponent
      visible={visible}
      loading={loading}
      templatesLoading={templatesLoading}
      experimentsLoading={experimentsLoading}
      experimentsData={experimentsData}
      templatesData={templatesData}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
    />
  );
}

export default NewDeploymentModalContainer;
