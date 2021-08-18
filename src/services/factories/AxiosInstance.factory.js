import axios, { AxiosInstance } from 'axios';

import { AuthExpiredInterceptor } from 'services/interceptors';

export const AXIOS_INSTANCE_FACTORY_IDENTIFIER = 'CreatedWithAxiosFactory';

/**
 * Creates a new axios instance with default configs.
 *
 * @param {object} configs Axios instance configs
 * @param {string} configs.baseURL Axios instance baseURL
 * @returns {AxiosInstance} A new axios instance
 */
export const createAxiosInstance = ({ baseURL }) => {
  const axiosInstance = axios.create({
    baseURL,
  });

  axiosInstance.interceptors.response.use(
    AuthExpiredInterceptor.Response.onFulfilled,
    AuthExpiredInterceptor.Response.onRejected
  );

  // Custom parameter to identify the instances created with this factory
  axiosInstance.factoryIdentifier = AXIOS_INSTANCE_FACTORY_IDENTIFIER;

  return axiosInstance;
};
