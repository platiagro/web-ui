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
    const { isOpen, isClosed, isConnecting } = createExperimentLogsEventSource(
      'projectId',
      'experimentId'
    );

    expect(window.EventSource).toBeCalledTimes(1);
    expect(typeof isOpen).toBe('function');
    expect(typeof isClosed).toBe('function');
    expect(typeof isConnecting).toBe('function');
  });
});
