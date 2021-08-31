import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { Selectors } from 'store/projects/experiments';
import { PrepareDeploymentsModal } from 'components/Modals';
import { hidePrepareDeploymentsModal } from 'store/ui/actions';
import { prepareDeployments } from 'store/deployments';

const visibleSelector = ({ uiReducer }) => {
  return uiReducer.prepareDeploymentsModal.visible;
};

const experimentsSelector = (projectId) => (state) => {
  return Selectors.getExperiments(state, projectId);
};

const PrepareDeploymentsModalContainer = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const visible = useSelector(visibleSelector);
  const experiments = useSelector(experimentsSelector(projectId));

  const handleConfirm = (values) => {
    const experimentsArray = Object.keys(values).filter(
      (el) => values[el] === true
    );

    if (experimentsArray.length > 0) {
      dispatch(prepareDeployments(experimentsArray, projectId, history));
    }
  };

  return (
    <PrepareDeploymentsModal
      visible={visible}
      experiments={experiments}
      onConfirm={handleConfirm}
      onClose={() => dispatch(hidePrepareDeploymentsModal())}
    />
  );
};

export default PrepareDeploymentsModalContainer;
