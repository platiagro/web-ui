import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const deploymentsSelector = ({ deploymentsReducer }) => {
  return deploymentsReducer;
};

export default (deploymentId) => {
  const history = useHistory();

  const deployments = useSelector(deploymentsSelector);

  useEffect(() => {
    if (!deployments?.length || !deploymentId) return;

    const currentExperiment = deployments.find(
      ({ uuid }) => uuid === deploymentId
    );

    if (!currentExperiment) {
      history.replace('/erro-404');
    }
  }, [deploymentId, deployments, history]);
};
