/* eslint-disable consistent-return */
import axios from 'axios';
import { message } from 'antd';

export const resultsApi = axios.create({
  baseURL: process.env.REACT_APP_DATASET_API || '/datasets/apis',
});

// id is experiment id
export const getResultTable = async (id, body) => {
  try {
    const send = JSON.stringify(body);

    console.log(send);

    const getObject = {
      task: 'feature-temporal',
      headerId: '7c3232a0-7325-4afd-a01d-9170617fac06',
    };

    const response = await resultsApi.get(`/results/${id}`, {
      data: getObject,
    });

    return response.data.payload;
  } catch (error) {
    message.error(error.message);
  }
};
