/* eslint-disable consistent-return */
import { message } from 'antd';
import axios from 'axios';
import uuidv4 from 'uuid/v4';
import Cookies from 'universal-cookie';

import * as componentsServices from './componentsApi';

export const URL = process.env.REACT_APP_JUPYTER_API || '';

export const componentsApi = axios.create({
  baseURL: URL,
});

export const getNamespaces = async () => {
  try {
    const response = await componentsApi.get(`/jupyter/api/namespaces`);
    return response;
  } catch (error) {
    message.error(error.message);
  }
};

export const getNotebook = async (namespace) => {
  try {
    const response = await componentsApi.get(
      `/jupyter/api/namespaces/${namespace}/notebooks`
    );
    return response;
  } catch (error) {
    message.error(error.message);
  }
};

export const uploadFile = async (id, namespace, notebook, fileName) => {
  try {
    const responseFileBase64 = await componentsServices.downloadBase64(
      id,
      fileName
    );

    if (!responseFileBase64) {
      return;
    }

    const { payload } = responseFileBase64.data;
    const body = {
      content: payload,
      format: 'base64',
      name: fileName,
      path: fileName,
      type: 'file',
    };

    const uuid = uuidv4();
    const cookies = new Cookies();
    cookies.set('_xsrf', uuid, { path: '/' });

    const response = await componentsApi.put(
      `/notebook/${namespace}/${notebook}/api/contents/${fileName}`,
      body,
      {
        credentials: 'include',
        headers: {
          'X-XSRFToken': uuid,
        },
      }
    );
    return response;
  } catch (error) {
    message.error(error.message);
  }
};
