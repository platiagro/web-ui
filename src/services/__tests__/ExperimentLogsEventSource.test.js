import { createExperimentLogsEventSource } from 'services/ExperimentLogsEventSource';

describe('ExperimentLogsEventSource', () => {
  beforeAll(() => {
    const EventSourceMock = jest.fn();
    global.EventSource = EventSourceMock;
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should contain the project ID and experiment ID in the URL', () => {
    createExperimentLogsEventSource('projectId', 'experimentId');
    expect(window.EventSource).toBeCalledTimes(1);
  });
});
