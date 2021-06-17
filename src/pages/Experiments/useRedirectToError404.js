import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { Selectors } from 'store/projects/experiments';

const experimentsSelector = (projectId) => (state) => {
  return Selectors.getExperiments(state, projectId);
};

export default (projectId, experimentId) => {
  const history = useHistory();

  const experiments = useSelector(experimentsSelector(projectId));

  useEffect(() => {
    if (!experiments?.length || !experimentId) return;

    const currentExperiment = experiments.find(
      ({ uuid }) => uuid === experimentId
    );

    if (!currentExperiment) {
      history.replace('/erro-404');
    }
  }, [experimentId, experiments, history]);
};
