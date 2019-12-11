/* eslint-disable consistent-return */
import axios from 'axios';
import { message } from 'antd';

export const URL = process.env.REACT_APP_PIPELINES_API || '';

export const pipelinesApi = axios.create({
  baseURL: URL,
});

export const getPipelines = async () => {
  try {
    const response = await pipelinesApi.get('/pipeline/apis/v1beta1/pipelines');
    const returnPipelines = {};

    response.data.pipelines.forEach((pipeline) => {
      const splitedName = pipeline.name.split('] ');
      const name = splitedName[1];
      const isTraining = splitedName[0].includes('Training');

      if (!(name in returnPipelines)) {
        returnPipelines[name] = {};
      }

      if (isTraining) {
        returnPipelines[name].trainId = pipeline.id;
      } else {
        returnPipelines[name].deployId = pipeline.id;
      }
    });

    return returnPipelines;
  } catch (error) {
    message.error(error.message);
  }
};

export const startRun = async (body) => {
  try {
    const response = await pipelinesApi.post(
      '/pipeline/apis/v1beta1/runs',
      body
    );

    return response;
  } catch (error) {
    message.error(error.message);
    if (error.response) console.error(error.response.data.message);
  }
};

export const getStatusRun = async (runId) => {
  try {
    const response = await pipelinesApi.get(
      `/pipeline/apis/v1beta1/runs/${runId}`
    );

    return response;
  } catch (error) {
    message.error(error.message);
  }
};

export const getDeployments = async () => {
  try {
    const response = await pipelinesApi.get(
      '/pipeline/apis/v1beta1/runs?page_size=100'
    );
    const returnDeployments = [];

    if (response.data.runs) {
      response.data.runs.forEach((run) => {
        const manifest = run.pipeline_spec.workflow_manifest;
        const runId = run.id;
        const { name } = run;
        const createdAt = new Date(run.created_at);
        const day = `0${createdAt.getDate()}`.slice(-2);
        const month = `0${createdAt.getMonth() + 1}`.slice(-2);
        const year = createdAt.getFullYear();
        const hour = `0${createdAt.getHours()}`.slice(-2);
        const min = `0${createdAt.getMinutes()}`.slice(-2);
        const sec = `0${createdAt.getSeconds()}`.slice(-2);
        const created = `${day}/${month}/${year} ${hour}:${min}:${sec}`;
        const isDeployment = manifest.includes('SeldonDeployment');

        if (isDeployment) {
          const deploymentName = run.pipeline_spec.parameters.find(
            (p) => p.name === 'deployment-name'
          ).value;
          const experimentId = run.pipeline_spec.parameters.find(
            (p) => p.name === 'experiment-id'
          ).value;
          const target = run.pipeline_spec.parameters.find(
            (p) => p.name === 'target'
          ).value;
          const date = run.pipeline_spec.parameters.find(
            (p) => p.name === 'date'
          ).value;
          const csv = run.pipeline_spec.parameters.find((p) => p.name === 'csv')
            .value;
          const getUrl = window.location;
          const url = `${getUrl.protocol}//${getUrl.host}/seldon/kubeflow/${deploymentName}/api/v0.1/predictions`;
          const deployment = {
            key: runId,
            flowName: name,
            url,
            created,
            action: `explorer?experiment_id=${experimentId}&target_var=${target}&date_var=${date}&csv=${csv}`,
          };
          returnDeployments.push(deployment);
        }
      });
    }

    return returnDeployments;
  } catch (error) {
    message.error(error.message);
  }
};

// export const getHeader = async (id) => {
//   try {
//     const response = await dataSetApi.get(`/headers/${id}`);

//     return response;
//   } catch (error) {
//     message.error(error.message);
//   }
// };

// export const getHeaderColumns = async (id) => {
//   try {
//     const response = await dataSetApi.get(`/headers/${id}/columns`);

//     return response;
//   } catch (error) {
//     message.error(error.message);
//   }
// };

// export const updateColumn = async (headerId, columnId, datatype) => {
//   try {
//     const body = {
//       datatype,
//     };

//     const response = await dataSetApi.patch(
//       `/headers/${headerId}/columns/${columnId}`,
//       body
//     );

//     return response;
//   } catch (error) {
//     message.error(error.message);
//   }
// };

// export const uploadDataSet = async (form) => {
//   try {
//     const response = await dataSetApi.post(`/datasets`, form);

//     return response;
//   } catch (error) {
//     message.error(error.message);
//   }
// };
