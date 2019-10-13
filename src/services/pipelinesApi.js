/* eslint-disable consistent-return */
import axios from 'axios';
import { message } from 'antd';

// /pipeline/apis/v1beta1/pipelines

export const pipelinesApi = axios.create({
  // baseURL: process.env.REACT_APP_PIPELINES_API || 'http://localhost:3002',
  baseURL: 'http://10.50.11.180:31380/',
  crossDomain: true, // /!!process.env.REACT_APP_PIPELINES_API,
});

// { databaseName: null, trainId: null, deployId: null };

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
