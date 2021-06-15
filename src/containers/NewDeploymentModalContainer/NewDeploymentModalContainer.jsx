import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { NewDeploymentModal as NewDeploymentModalComponent } from 'components';

import { hideNewDeploymentModal } from 'store/ui/actions';
import { createDeploymentRequest } from 'store/deployments/actions';

import { Selectors } from 'store/projects/experiments';
import { fetchTemplatesRequest } from 'store/templates/actions';

const { getExperiments } = Selectors;

/**
 * New deployment modal container
 */
function NewDeploymentModalContainer() {
  const dispatch = useDispatch();
  const { projectId } = useParams();

  // TODO: Criar seletor com reselect
  /* eslint-disable-next-line */
  const experimentsData = useSelector((state) =>
    getExperiments(state, projectId)
  );

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
  const templatesData = useSelector((state) => state.templatesReducer);
  /* eslint-enable */

  const handleConfirm = (selectedType, selectedUuid) => {
    let experimentId = selectedType === 'experiment' ? selectedUuid : undefined;
    let templateId = selectedType === 'template' ? selectedUuid : undefined;

    dispatch(createDeploymentRequest(projectId, experimentId, templateId));
  };
  const handleCancel = () => dispatch(hideNewDeploymentModal());

  useEffect(() => {
    dispatch(fetchTemplatesRequest(projectId));
  }, [dispatch, projectId]);

  return (
    <NewDeploymentModalComponent
      visible={visible}
      loading={loading}
      templatesLoading={templatesLoading}
      experimentsData={experimentsData}
      templatesData={templatesData}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
    />
  );
}

export default NewDeploymentModalContainer;
