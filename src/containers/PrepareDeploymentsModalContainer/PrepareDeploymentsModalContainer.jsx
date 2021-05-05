import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { PrepareDeploymentsModal } from 'components/Modals';

import { hidePrepareDeploymentsModal } from 'store/ui/actions';
import { prepareDeployments } from 'store/deployments/actions';

import { Selectors } from 'store/projects/experiments';

const { getExperiments } = Selectors;

/**
 * Container to display using deployments modal.
 */
const PrepareDeploymentsModalContainer = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  // TODO: Utilizar reselect
  /* eslint-disable-next-line */
  const experiments = useSelector((state) => getExperiments(state, projectId));

  // TODO: criar seletor
  /* eslint-disable-next-line */
  const visible = useSelector(
    (state) => state.uiReducer.prepareDeploymentsModal.visible
  );

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
      loading={false}
      experiments={experiments}
      onClose={() => dispatch(hidePrepareDeploymentsModal())}
      onConfirm={handleConfirm}
    />
  );
};

export default PrepareDeploymentsModalContainer;
