export const createDeploymentLogsEventSource = (projectId, deploymentId) => {
  const eventSource = new EventSource(
    `${process.env.REACT_APP_PROJECTS_API}/projects/${projectId}/deployments/${deploymentId}/logs/eventsource`
  );

  return {
    eventSource,
    isOpen: () => {
      return eventSource.readyState === EventSource.OPEN;
    },
    isClosed: () => {
      return eventSource.readyState === EventSource.CLOSED;
    },
    isConnecting: () => {
      return eventSource.readyState === EventSource.CONNECTING;
    },
  };
};

export default {
  createDeploymentLogsEventSource,
};
