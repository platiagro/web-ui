import nock from 'nock';
import * as projectsServices from '../projectsApi';

const id = 'id';
const experimentId = 'experimentId';

describe('projects API', () => {
  it('should call getAllProjects success', async () => {
    nock(projectsServices.URL)
      .get(`/projects`)
      .reply(200);

    const response = await projectsServices.getAllProjects();
    expect(response).toBeTruthy();
  });

  it('should call getAllProjects error', async () => {
    nock(projectsServices.URL)
      .get(`/projects`)
      .reply(400);

    const response = await projectsServices.getAllProjects();
    expect(response).toEqual(undefined);
  });

  it('should call getProject success', async () => {
    nock(projectsServices.URL)
      .get(`/projects/${id}`)
      .reply(200);

    const response = await projectsServices.getProject(id);
    expect(response).toBeTruthy();
  });

  it('should call getProject error', async () => {
    nock(projectsServices.URL)
      .get(`/projects/${id}`)
      .reply(400);

    const response = await projectsServices.getProject(id);
    expect(response).toEqual(undefined);
  });

  it('should call createProject success', async () => {
    nock(projectsServices.URL)
      .post(`/projects/`)
      .reply(200);

    const response = await projectsServices.createProject('projectName');
    expect(response).toBeTruthy();
  });

  it('should call createProject error', async () => {
    nock(projectsServices.URL)
      .post(`/projects/`)
      .reply(400);

    const response = await projectsServices.createProject('projectName');
    expect(response).toEqual(undefined);
  });

  it('should call updateProject success', async () => {
    nock(projectsServices.URL)
      .patch(`/projects/${id}`)
      .reply(200);

    const response = await projectsServices.updateProject(id, 'projectName');
    expect(response).toBeTruthy();
  });

  it('should call updateProject error', async () => {
    nock(projectsServices.URL)
      .patch(`/projects/${id}`)
      .reply(400);

    const response = await projectsServices.updateProject(id, 'projectName');
    expect(response).toEqual(undefined);
  });

  it('should call getExperimentList success', async () => {
    nock(projectsServices.URL)
      .get(`/projects/${id}/experiments`)
      .reply(200);

    const response = await projectsServices.getExperimentList(id);
    expect(response).toBeTruthy();
  });

  it('should call getExperimentList error', async () => {
    nock(projectsServices.URL)
      .get(`/projects/${id}/experiments`)
      .reply(400);

    const response = await projectsServices.getExperimentList(id);
    expect(response).toEqual(undefined);
  });

  it('should call getExperiment success', async () => {
    nock(projectsServices.URL)
      .get(`/projects/${id}/experiments/${experimentId}`)
      .reply(200);

    const response = await projectsServices.getExperiment(id, experimentId);
    expect(response).toBeTruthy();
  });

  it('should call getExperiment error', async () => {
    nock(projectsServices.URL)
      .get(`/projects/${id}/experiments/${experimentId}`)
      .reply(400);

    const response = await projectsServices.getExperiment(id, experimentId);
    expect(response).toEqual(undefined);
  });

  it('should call createExperiment success', async () => {
    nock(projectsServices.URL)
      .post(`/projects/${id}/experiments/`)
      .reply(200);

    const response = await projectsServices.createExperiment(
      id,
      'experimentName'
    );
    expect(response).toBeTruthy();
  });

  it('should call createExperiment error', async () => {
    nock(projectsServices.URL)
      .post(`/projects/${id}/experiments/`)
      .reply(400);

    const response = await projectsServices.createExperiment(
      id,
      'experimentName'
    );
    expect(response).toEqual(undefined);
  });

  it('should call updateExperiment success', async () => {
    nock(projectsServices.URL)
      .patch(`/projects/${id}/experiments/${experimentId}`)
      .reply(200);

    const response = await projectsServices.updateExperiment(
      id,
      experimentId,
      'body'
    );
    expect(response).toBeTruthy();
  });

  it('should call updateExperiment error', async () => {
    nock(projectsServices.URL)
      .patch(`/projects/${id}/experiments/${experimentId}`)
      .reply(400);

    const response = await projectsServices.updateExperiment(
      id,
      experimentId,
      'body'
    );
    expect(response).toEqual(undefined);
  });
});
