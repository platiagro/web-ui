import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { useIsLoading } from 'hooks';
import { hideNewDeploymentModal } from 'store/ui/actions';
import DEPLOYMENTS_TYPES from 'store/deployments/actionTypes';
import { getTemplates } from 'store/templates/templates.selectors';
import { createDeploymentRequest } from 'store/deployments/actions';
import * as TEMPLATES_TYPES from 'store/templates/templates.actionTypes';
import { fetchTemplatesRequest } from 'store/templates/templates.actions';
import { NewDeploymentModal as NewDeploymentModalComponent } from 'components';
import { getExperiments } from 'store/projects/experiments/experiments.selectors';

const experimentsDataSelector = (projectId) => (state) => {
  return getExperiments(state, projectId);
};

const visibleSelector = ({ uiReducer }) => {
  return uiReducer.newDeploymentModal.visible;
};

const NewDeploymentModalContainer = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();

  const visible = useSelector(visibleSelector);
  const templatesData = useSelector(getTemplates);
  const experimentsData = useSelector(experimentsDataSelector(projectId));

  const isLoading = useIsLoading(DEPLOYMENTS_TYPES.CREATE_DEPLOYMENT_REQUEST);

  const isLoadingTemplates = useIsLoading(
    TEMPLATES_TYPES.FETCH_TEMPLATES_REQUEST
  );

  const handleConfirm = (selectedType, selectedUuid) => {
    const isExperiment = selectedType === 'experiment';
    const isTemplate = selectedType === 'template';
    const experimentId = isExperiment ? selectedUuid : undefined;
    const templateId = isTemplate ? selectedUuid : undefined;
    dispatch(createDeploymentRequest(projectId, experimentId, templateId));
  };

  const handleCancel = () => {
    dispatch(hideNewDeploymentModal());
  };

  useEffect(() => {
    if (visible) dispatch(fetchTemplatesRequest(projectId));
  }, [dispatch, projectId, visible]);

  return (
    <NewDeploymentModalComponent
      visible={visible}
      loading={isLoading}
      templatesData={templatesData}
      experimentsData={experimentsData}
      templatesLoading={isLoadingTemplates}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
    />
  );
};

export default NewDeploymentModalContainer;
