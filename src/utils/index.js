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
} from './Generic.utils';

import {
  formatCompareResultDate,
  formatResultsParameters,
  transformResults,
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
