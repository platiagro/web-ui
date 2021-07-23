/**
 * Steps to Refactor:
 *
 * (FINISHED) 1 - Create src/utils folder
 * (FINISHED) 2 - Group functions by its functionality
 * (FINISHED) 3 - Fix JsDoc
 * (PARTIALLY FINISHED) 4 - Simplify logic
 * 5 - Remove functions that are used in just one place or functions to specific scenarios, because this folder must contain only reusable and generic functions
 * 6 - Break complex functions in smaller ones (Single Responsibility, DRY)
 */

import {
  createMenu,
  filterMenu,
  getTagConfig,
  getTaskData,
} from './Task.utils';

import {
  copyToClipboard,
  downloadFile,
  formatBase64,
  getErrorMessage,
  isImage,
  isSupportedBinaryData,
  readFileContent,
  sleep,
  toRawText,
  getSeldonObjectMimeType,
  accessCookie,
  deleteCookie,
} from './Generic.utils';

import {
  formatCompareResultDate,
  formatResultsParameters,
  transformResults,
  downloadExperimentRunResult,
} from './Results.utils';

import {
  configureOperatorParameters,
  checkOperatorSettedUp,
  configureOperators,
  filterOperatorParameters,
  getDatasetName,
  getFeaturetypes,
  hasFeaturetypes,
  selectOperator,
  successOperatorMap,
  transformColumnsInParameterOptions,
} from './Operator.utils';

import {
  changeExperimentSucceededStatus,
  changeProjectExperiments,
  checkExperimentSuccess,
  deleteExperiment,
  organizeExperiments,
} from './Experiment.utils';

export default {
  createMenu,
  filterMenu,
  getTagConfig,
  getTaskData,

  copyToClipboard,
  downloadFile,
  formatBase64,
  getErrorMessage,
  isImage,
  isSupportedBinaryData,
  readFileContent,
  sleep,
  toRawText,
  getSeldonObjectMimeType,
  accessCookie,
  deleteCookie,

  formatCompareResultDate,
  formatResultsParameters,
  transformResults,
  downloadExperimentRunResult,

  configureOperatorParameters,
  checkOperatorSettedUp,
  configureOperators,
  filterOperatorParameters,
  getDatasetName,
  getFeaturetypes,
  hasFeaturetypes,
  selectOperator,
  successOperatorMap,
  transformColumnsInParameterOptions,

  changeExperimentSucceededStatus,
  changeProjectExperiments,
  checkExperimentSuccess,
  deleteExperiment,
  organizeExperiments,
};
