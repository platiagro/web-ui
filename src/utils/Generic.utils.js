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
 * @param {object} seldonObject seldon object
 * @returns {boolean} if a response includes a encoded base64 string or not
 */
export const isSupportedBinaryData = (seldonObject) => {
  const isExpectedResponse = Object.keys(seldonObject).includes('binData');

  if (isExpectedResponse) {
    const contentType = seldonObject?.meta?.tags?.['content-type'];
    const base = `data:${contentType};base64`;
    const content = seldonObject?.binData;
    const mimeType = base.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/);
    if (mimeType) {
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
 * @param {object} seldonObject seldonObject from Seldon
 * @returns {boolean} the seldon object includes a encoded base64 image or not
 */
export const isImage = (seldonObject) => {
  const contentType = seldonObject.meta?.tags?.['content-type'];
  return Boolean(contentType) && contentType.includes('image/');
};

/**
 * Get the mime type for a given seldon object
 *
 * @param {object} seldonObject seldon object
 * @returns {string} mime type
 */
export const getSeldonObjectMimeType = (seldonObject) => {
  const { binData, names, ndarray, strData } = seldonObject;
  if (names && ndarray) return 'data:text/csv';
  else if (binData) return 'data:image/jpeg';
  else if (strData) return 'data:text/plain';
  return '';
};

/**
 * Transform a string into base64 format.
 *
 * @param {object} seldonObject seldon object
 * @returns {string} a string with in base64 format
 */
export const formatBase64 = (seldonObject) => {
  const mimeType = getSeldonObjectMimeType(seldonObject);
  return `${mimeType};base64,${seldonObject.binData}`;
};

/**
 * Transform a tabular data or a binary data to a plain text.
 *
 * @param {object} seldonObject seldon object response
 * @returns {string} a string with Seldon response
 */
export const toRawText = (seldonObject) => {
  const { binData, names, ndarray, strData } = seldonObject;
  if (names && ndarray) {
    const columns = names.join(',');
    return columns + '\n' + ndarray.join('\n');
  } else if (binData) {
    return binData;
  } else if (strData) {
    return strData;
  }
  return '';
};

/**
 * Copy Seldon response to clipboard.
 *
 * @param {object} seldonObject seldon object
 */
export const copyToClipboard = (seldonObject) => {
  const text = toRawText(seldonObject);

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
 * @param {object} seldonObject seldon object
 * @returns {string} base64 content
 */
export const downloadFile = (seldonObject) => {
  const isBinaryDataSupported = isSupportedBinaryData(seldonObject);
  if (isBinaryDataSupported) return formatBase64(seldonObject);
  const base64 = btoa(toRawText(seldonObject));
  const mimeType = getSeldonObjectMimeType(seldonObject);
  return `${mimeType};base64,${base64}`;
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
