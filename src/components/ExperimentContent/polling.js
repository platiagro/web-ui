/* eslint-disable no-console */
import { message } from 'antd';
import _ from 'lodash';
import { getStatusRun } from '../../services/pipelinesApi';
import { updateExperiment } from '../../services/projectsApi';
import taskGetPhases from './util';

const pollingRun = (
  details,
  pollingId,
  taskStatus,
  setTaskStatus,
  setRunStatus
) => {
  let intervalPolling;
  async function fetchRunStatus() {
    const runRes = await getStatusRun(pollingId);

    if (runRes) {
      if (
        runRes.data.run.status === 'Running' ||
        runRes.data.run.status === undefined
      ) {
        console.info('[STATUS]', runRes.data.run.status);

        if (runRes.data.run.status) {
          setRunStatus(runRes.data.run.status);
          const manifest = JSON.parse(
            runRes.data.pipeline_runtime.workflow_manifest
          );
          const tasks = taskGetPhases(taskStatus, manifest);
          setTaskStatus(tasks);
        }
      } else {
        clearInterval(intervalPolling);
        console.log('Finalizou', runRes.data.run);
        if (runRes.data.run.status === 'Succeeded') {
          message.success(`${runRes.data.run.name} finalizou com Sucesso!`);
          const resUpdate = await updateExperiment(
            details.projectId,
            details.uuid,
            {
              runStatus: 'Succeeded',
            }
          );
          console.info(resUpdate);
        } else if (runRes.data.run.status === 'Failed') {
          message.error(`${runRes.data.run.name} finalizou com Falha!`);
        }

        setRunStatus(runRes.data.run.status);

        const manifest = JSON.parse(
          runRes.data.pipeline_runtime.workflow_manifest
        );
        const tasks = taskGetPhases(taskStatus, manifest);
        setTaskStatus(tasks);
      }
    }
  }

  console.log('Start polling id: ', pollingId);
  setTaskStatus(_.mapValues(taskStatus, () => 'Pending'));
  setRunStatus('Running');
  intervalPolling = setInterval(() => {
    fetchRunStatus();
  }, 3000);
};

export default pollingRun;
