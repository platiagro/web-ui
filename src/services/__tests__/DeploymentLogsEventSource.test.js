import { createDeploymentLogsEventSource } from 'services/DeploymentLogsEventSource';

describe('DeploymentLogsEventSource', () => {
  beforeAll(() => {
    const EventSourceMock = jest.fn();
    global.EventSource = EventSourceMock;
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should contain the project ID and deployment ID in the URL', () => {
    const { isOpen, isClosed, isConnecting } = createDeploymentLogsEventSource(
      'projectId',
      'deploymentId'
    );

    expect(window.EventSource).toBeCalledTimes(1);
    expect(typeof isOpen).toBe('function');
    expect(typeof isClosed).toBe('function');
    expect(typeof isConnecting).toBe('function');
  });
});
