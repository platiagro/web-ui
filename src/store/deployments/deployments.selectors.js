export const getDeploymentById =
  (deploymentId) =>
  ({ deploymentsReducer }) => {
    return deploymentsReducer.find(({ uuid }) => uuid === deploymentId);
  };

export const getDeployments = ({ deploymentsReducer }) => {
  return deploymentsReducer;
};

export const getSortedDeployments = ({ deploymentsReducer }) => {
  const deployments = deploymentsReducer || [];

  return deployments.sort((a, b) => {
    if (a.position === b.position) {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    }

    return a.position - b.position;
  });
};

export const getValidDeployments = ({ deploymentsReducer }) => {
  const deployments = deploymentsReducer || [];
  // filters by deployments that have an URL
  // ensures only items that are actually deployed are shown
  return deployments.filter((deployment) => !!deployment.url);
};

export const getDeploymentsUrl =
  (currentDeploymentId) =>
  ({ deploymentsReducer }) => {
    return (
      deploymentsReducer.find(({ uuid }) => uuid === currentDeploymentId)
        ?.url ||
      `${window.location.origin.toString()}/seldon/anonymous/${currentDeploymentId}/api/v1.0/predictions`
    );
  };
