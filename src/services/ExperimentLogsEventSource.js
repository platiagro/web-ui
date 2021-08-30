export const createExperimentLogsEventSource = (projectId, experimentId) => {
  const URL = process.env.REACT_APP_PROJECTS_API || 'http://localhost:8080';

  const eventSource = new EventSource(
    `${URL}/projects/${projectId}/experiments/${experimentId}/logs/eventsource`
  );

  return {
    eventSource,
  };
};

export default {
  createExperimentLogsEventSource,
};
