export const createDeploymentLogsEventSource = (projectId, deploymentId) => {
  const URL = process.env.REACT_APP_PROJECTS_API || 'http://localhost:8080';

  const eventSource = new EventSource(
    `${URL}/projects/${projectId}/deployments/${deploymentId}/logs/eventsource`
  );

  return {
    eventSource,
  };
};

export default {
  createDeploymentLogsEventSource,
};
