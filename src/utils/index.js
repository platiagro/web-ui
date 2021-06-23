import { createMenu, filterMenu, getTagConfig, getTaskData } from './TaskUtils';

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
} from './GenericUtils';

import {
  formatCompareResultDate,
  formatResultsParameters,
  transformResults,
} from './ResultsUtils';

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
} from './OperatorUtils';

import {
  changeExperimentSucceededStatus,
  changeProjectExperiments,
  checkExperimentSuccess,
  deleteExperiment,
  organizeExperiments,
} from './ExperimentUtils';

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

  formatCompareResultDate,
  formatResultsParameters,
  transformResults,

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
