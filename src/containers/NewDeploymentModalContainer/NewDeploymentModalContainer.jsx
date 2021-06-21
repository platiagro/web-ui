import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { useIsLoading } from 'hooks';
import { Selectors } from 'store/projects/experiments';
import { hideNewDeploymentModal } from 'store/ui/actions';
import { fetchTemplatesRequest } from 'store/templates/actions';
import DEPLOYMENTS_TYPES from 'store/deployments/actionTypes';
import { createDeploymentRequest } from 'store/deployments/actions';
import { NewDeploymentModal as NewDeploymentModalComponent } from 'components';

const experimentsDataSelector = (projectId) => (state) => {
  return Selectors.getExperiments(state, projectId);
};

const visibleSelector = ({ uiReducer }) => {
  return uiReducer.newDeploymentModal.visible;
};

const templatesLoadingSelector = ({ uiReducer }) => {
  return uiReducer.template.loading;
};

const templatesDataSelector = ({ templatesReducer }) => {
  return templatesReducer;
};

const NewDeploymentModalContainer = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();

  const visible = useSelector(visibleSelector);
  const templatesData = useSelector(templatesDataSelector);
  const templatesLoading = useSelector(templatesLoadingSelector);
  const experimentsData = useSelector(experimentsDataSelector(projectId));

  const isLoading = useIsLoading(DEPLOYMENTS_TYPES.CREATE_DEPLOYMENT_REQUEST);

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
    dispatch(fetchTemplatesRequest(projectId));
  }, [dispatch, projectId]);

  return (
    <NewDeploymentModalComponent
      visible={visible}
      loading={isLoading}
      templatesData={templatesData}
      experimentsData={experimentsData}
      templatesLoading={templatesLoading}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
    />
  );
};

export default NewDeploymentModalContainer;
