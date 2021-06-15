import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Selectors } from 'store/projects/experiments';
import { hideNewDeploymentModal } from 'store/ui/actions';
import { createDeploymentRequest } from 'store/deployments/actions';
import { NewDeploymentModal as NewDeploymentModalComponent } from 'components';
import { useIsLoading } from 'hooks';
import { fetchTemplatesRequest } from 'store/templates/templates.actions';
import * as TEMPLATES_TYPES from 'store/templates/templates.actionTypes';

const experimentsDataSelector = (projectId) => (state) => {
  return Selectors.getExperiments(state, projectId);
};

const visibleSelector = ({ uiReducer }) => {
  return uiReducer.newDeploymentModal.visible;
};

const loadingSelector = ({ uiReducer }) => {
  return uiReducer.newDeploymentModal.loading;
};

const templatesDataSelector = ({ templatesReducer }) => {
  return templatesReducer;
};

const NewDeploymentModalContainer = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();

  const experimentsData = useSelector(experimentsDataSelector(projectId));
  const visible = useSelector(visibleSelector);
  const loading = useSelector(loadingSelector);
  const templatesData = useSelector(templatesDataSelector);

  const templatesLoading = useIsLoading(
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
      loading={loading}
      templatesData={templatesData}
      experimentsData={experimentsData}
      templatesLoading={templatesLoading}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
    />
  );
};

export default NewDeploymentModalContainer;
