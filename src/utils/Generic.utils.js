import { notification } from 'antd';

/**
 * Get the error message
 *
 * @param {Error} error error
 * @returns {string} error message
 */
export const getErrorMessage = (error) => {
  return error.response?.data?.message || error.message;
};

/**
 * Sleep method
 *
 * @param {number} milliseconds milliseconds
 * @returns {Promise} promise
 */
export const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

/**
 * Checks if a response is one of the supported binary file types (video and image)
 *
 * @param {object} response response from Seldon
 * @returns {boolean} if a response includes a encoded base64 string or not
 */
export const isSupportedBinaryData = (response) => {
  const isExpectedResponse = Object.keys(response).includes('binData');

  if (isExpectedResponse) {
    const base = `data:${response?.meta?.tags?.['content-type']};base64`;
    const content = response?.binData;

    const mimeType = base.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/);
    if (mimeType != null) {
      const pattern = /[A-Za-z0-9+/=]/;
      const [type] = mimeType.shift().split('/');
      if (['video', 'image'].includes(type) && pattern.test(content))
        return true;
    }
  }
  return false;
};

/**
 * Check if a array has a encoded base64 image
 *
 * @param {object} response response from Seldon
 * @returns {boolean} is a response includes a encoded base64 image or not
 */
export const isImage = (response) => {
  const contentType = response.meta?.tags?.['content-type'];
  return Boolean(contentType) && contentType.includes('image/');
};

/**
 * Transform a string into base64 format.
 *
 * @param {string} data string
 * @returns {string} a string with in base64 format
 */
export const formatBase64 = (data) => {
  return `data:${data.meta.tags['content-type']};base64,${data.binData}`;
};

/**
 * Transform a tabular data or a binary data to a plain text.
 *
 * @param {object} strEncoded seldon object response
 * @returns {string} a string with Seldon response
 */
export const toRawText = (strEncoded) => {
  const { binData, names, ndarray, strData } = strEncoded;
  if (names && ndarray) {
    const columns = names.join(',');
    return columns + '\n' + ndarray.join('\n');
  } else if (binData) {
    return binData;
  } else {
    return strData;
  }
};

/**
 * Copy Seldon response to clipboard.
 *
 * @param {object} experimentInference experiment inference
 */
export const copyToClipboard = (experimentInference) => {
  const text = toRawText(experimentInference);

  navigator.clipboard
    .writeText(text)
    .then(() =>
      notification['success']({
        message: 'Texto Copiado',
        description:
          'O resultado do modelo foi copiado para sua área de transferência!',
      })
    )
    .catch(() =>
      notification['error']({
        message: 'Erro ao Copiar Texto',
        description: 'Pode ser que o retorno do modelo esteja corrompido.',
      })
    );
};

/**
 * Download a response content as file
 *
 * @param {object} experimentInference experiment inference
 * @returns {string} content as base64
 */
export const downloadFile = (experimentInference) => {
  return isSupportedBinaryData(experimentInference)
    ? formatBase64(experimentInference)
    : `data:text/plain;base64,${btoa(toRawText(experimentInference))}`;
};

/**
 * Read the content of a file
 *
 * @param {File} fileInstance file to read the content
 * @returns {Promise} promise that resolves to the file content as text
 */
export const readFileContent = (fileInstance) => {
  return new Promise((resolve, reject) => {
    if (typeof window.FileReader === 'function') {
      const fileReader = new FileReader();
      fileReader.onload = (reader) => resolve(reader.target.result);
      fileReader.onerror = (error) => reject(error);
      fileReader.readAsText(fileInstance);
    } else {
      const error = new Error(
        'window.FileReader not supported in your browser'
      );

      reject(error);
    }
  });
};
