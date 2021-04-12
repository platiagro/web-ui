import React from 'react';
import {
  AreaChartOutlined,
  ControlOutlined,
  DatabaseOutlined,
  FileOutlined,
  PictureOutlined,
  ReadOutlined,
  ShareAltOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import { notification } from 'antd';

/**
 * Delete Experiment
 * Method to delete experiment and reorganize list
 *
 * @param {object[]} experiments experiments list
 * @param {string} experimentId deleted experiment id
 * @returns {object[]} new experiments list
 */
const deleteExperiment = (experiments, experimentId) => {
  // experiments aux
  const experimentsAux = experiments;

  // getting experiment index
  const experimentIndex = experimentsAux.findIndex(
    (experiment) => experiment.uuid === experimentId
  );

  // splitting experiments list in experiment index
  let splittedExperiments = experimentsAux.splice(experimentIndex);
  // removing experiment from list
  splittedExperiments = splittedExperiments.splice(1);
  // shifting splitted experiments position
  splittedExperiments = splittedExperiments.map((experiment) => ({
    ...experiment,
    position: experiment.position - 1,
  }));

  // returning new experiment list
  return experimentsAux.concat(splittedExperiments);
};

/**
 * Organize Experiments
 * Method to organize experiments list
 *
 * @param {object[]} experiments experiments list
 * @param {string} dragExperimentId drag experiment id
 * @param {string} hoverExperimentId hover experiment id
 * @returns {object[]} new experiments list
 */
const organizeExperiments = (
  experiments,
  dragExperimentId,
  hoverExperimentId
) => {
  // experiments aux
  const experimentsAux = experiments;

  // getting drag experiment index
  const dragExperimentIndex = experimentsAux.findIndex(
    (experiment) => experiment.uuid === dragExperimentId
  );
  // getting hover experiment index
  const hoverExperimentIndex = experimentsAux.findIndex(
    (experiment) => experiment.uuid === hoverExperimentId
  );

  // moving to end
  if (dragExperimentIndex < hoverExperimentIndex) {
    // splitting a copy of experiments list to hover experiment index
    let splittedExperiments = experimentsAux.slice(
      dragExperimentIndex,
      hoverExperimentIndex + 1
    );

    // splitting drag experiment from list
    const dragExperiment = splittedExperiments.splice(0, 1)[0];

    // setting drag experiment position to hover position
    dragExperiment.position = [...splittedExperiments].pop().position;

    // shifting splitted experiments position
    splittedExperiments = splittedExperiments.map((experiment) => ({
      ...experiment,
      position: experiment.position - 1,
    }));

    // adding drag experiment to spplited experiments
    splittedExperiments = splittedExperiments.concat(dragExperiment);

    // replacing reorganized block the experiment list
    experimentsAux.splice(
      dragExperimentIndex,
      splittedExperiments.length,
      ...splittedExperiments
    );
  }

  // moving to start
  if (dragExperimentIndex > hoverExperimentIndex) {
    // splitting a copy of experiments list to hover experiment index
    let splittedExperiments = experimentsAux.slice(
      hoverExperimentIndex,
      dragExperimentIndex + 1
    );

    // splitting drag experiment from list
    const dragExperiment = splittedExperiments.pop();

    // setting drag experiment position to hover position
    dragExperiment.position = splittedExperiments[0].position;

    // shifting splitted experiments position
    splittedExperiments = splittedExperiments.map((experiment) => ({
      ...experiment,
      position: experiment.position + 1,
    }));

    // adding drag experiment to spplited experiments
    splittedExperiments.unshift(dragExperiment);

    // replacing reorganized block the experiment list
    experimentsAux.splice(
      hoverExperimentIndex,
      splittedExperiments.length,
      ...splittedExperiments
    );
  }

  // returning new experiment list ordened by position
  return experimentsAux.sort((a, b) => {
    if (a.position < b.position) {
      return -1;
    }
    if (a.position > b.position) {
      return 1;
    }
    return 0;
  });
};

/**
 * Filter Menu
 * Method to filter tasks list
 *
 * @param {object} menu menu object
 * @param {string} filter filter
 * @returns {object} filtered menu
 */
const filterMenu = (menu, filter) => {
  // filter is empty
  if (!filter) return menu;

  // convert filter to lower case
  const lowerCaseFilter = filter.toLowerCase();

  // filtered menu object
  const filteredMenu = {};

  // filtering menu
  Object.entries(menu).forEach(([submenu, items]) => {
    // submenu filtered items
    const filteredItems = items.filter((item) => {
      // convert item name to lower case
      const lowerCaseName = item.name.toLowerCase();

      // filter item
      return lowerCaseName.includes(lowerCaseFilter);
    });

    // inserting filtered items in filtered menu object
    if (filteredItems.length > 0) filteredMenu[submenu] = filteredItems;
  });

  return filteredMenu;
};

/**
 * Create Menu
 * Method to create menu object
 *
 * @param {object[]} tasks tasks list
 * @returns {object} menu object
 */
const createMenu = (tasks) => {
  // menu object constant
  const menu = {};
  // sorted menu
  const sortedMenu = {};

  // creating menu object
  tasks.forEach((task) => {
    // getting task data
    const { uuid, description, name } = task;
    // mapping submenus
    task.tags.forEach((tag) => {
      // creating submenu
      if (!menu[tag]) menu[tag] = [{ uuid, description, name }];
      else menu[tag].push({ uuid, description, name });
    });
  });

  // sorting menu
  Object.keys(menu)
    .sort()
    .forEach((submenu) => {
      sortedMenu[submenu] = menu[submenu];
    });

  return sortedMenu;
};

/**
 * Get Tag Config
 * Method to get tag config object
 *
 * @param {string} tag tag string
 * @returns {object} tag config object
 */
const getTagConfig = (tag) => {
  // TAGS CONFIG
  const tagsConfig = {
    // user tasks
    DEFAULT: {
      title: 'Minhas Tarefas',
      key: 'DEFAULT',
      icon: <SolutionOutlined />,
    },
    // datasets
    DATASETS: {
      title: 'Conjunto de dados',
      key: 'DATASETS',
      icon: <DatabaseOutlined />,
    },
    // descriptive statistics
    DESCRIPTIVE_STATISTICS: {
      title: 'Visualização de Dados',
      key: 'DESCRIPTIVE_STATISTICS',
      icon: <AreaChartOutlined />,
    },
    // feature engineering
    FEATURE_ENGINEERING: {
      title: 'Engenharia de Atributos',
      key: 'FEATURE_ENGINEERING',
      icon: <ControlOutlined />,
    },
    // training
    PREDICTOR: {
      title: 'Treinamento',
      key: 'PREDICTOR',
      icon: <ShareAltOutlined />,
    },
    // computer vision
    COMPUTER_VISION: {
      title: 'Visão Computacional',
      key: 'COMPUTER_VISION',
      icon: <PictureOutlined />,
    },
    // natural language
    NLP: {
      title: 'Texto e Linguagem',
      key: 'NLP',
      icon: <ReadOutlined />,
    },
    // templates
    TEMPLATES: { title: 'Templates', key: 'TEMPLATES', icon: <FileOutlined /> },
  };

  if (tagsConfig[tag] !== undefined) {
    return tagsConfig[tag];
  }

  return null;
};

/**
 * Get task Data
 * Method to get task data
 *
 * @param {object[]} tasks tasks list
 * @param {string} taskId task id
 * @returns {object} task data
 */
const getTaskData = (tasks, taskId) => {
  // params to filter constant
  const parametersToFilter = ['dataset'];

  if (tasks.length > 0 && taskId) {
    // getting tasks data
    const taskData = tasks.find((task) => task.uuid === taskId);
    const {
      name,
      tags,
      image,
      commands,
      arguments: args,
      experimentNotebookPath,
      deploymentNotebookPath,
      parameters,
      description,
    } = taskData;

    // filtering params
    let filteredParams;
    if (parameters) {
      filteredParams = parameters.filter(
        (parameter) => !parametersToFilter.includes(parameter.name)
      );
    }

    // getting icon
    const { icon } = getTagConfig(tags[0]);

    // returning task data
    return {
      name,
      icon,
      tags,
      image,
      commands,
      args,
      experimentNotebookPath,
      deploymentNotebookPath,
      parameters: filteredParams,
      description,
    };
  }

  return null;
};

/**
 * Configure Operator Parameters
 *
 * Method to configure operator parameters
 *
 * @param {object[]} taskParameters
 * @param {object} operatorParameters
 * @param {object[]} featureOptions
 * @param isDataset
 * @returns {object[]} configured operator parameters
 */
const configureOperatorParameters = (
  taskParameters,
  operatorParameters,
  featureOptions,
  isDataset
) => {
  // Returns the operator key and value
  let datasetParameters = undefined;

  if (isDataset && operatorParameters) {
    if (Array.isArray(operatorParameters)) {
      datasetParameters = operatorParameters;
    } else {
      datasetParameters = Object.keys(operatorParameters).map((key) => ({
        name: key,
        value: operatorParameters[key],
      }));
    }
  }

  const configuredOperatorParameters = taskParameters.map((parameter) => {
    let options;
    if (parameter.options) {
      // use parameter options if exist
      options = parameter.options;
    } else if (parameter.type === 'feature') {
      // use feature options if parameter is type feature
      options = featureOptions;
    } else {
      options = undefined;
    }

    let value;
    if (parameter.name in operatorParameters) {
      /**
       *  get the value from operatorParameters if parameter exist in operatorParameters
       *  to parameter multiple we need to split string by ','
       *  because the multiple values are in this format 'value1,value2,value3'
       */
      if (parameter.multiple && parameter.length) {
        value = operatorParameters[parameter.name].split(',').filter((el) => {
          return el !== '';
        });
      } else {
        value = operatorParameters[parameter.name];
      }
    } else if (parameter.multiple) {
      // for parameter multiple use a empty array to default value
      value = [];
    } else if (parameter.type === 'feature') {
      // for feature parameter use null to default value
      value = null;
    } else {
      value = parameter.default;
    }

    return {
      ...parameter,
      options: options,
      value: value,
    };
  });

  return datasetParameters || configuredOperatorParameters;
};

/**
 * Transform Columns In Parameter Options
 *
 * Method to transform dataset columns in feature type parameter options
 *
 * @param {object[]} datasetColumns dataset columns list
 * @returns {object[]} transformed columns
 */
const transformColumnsInParameterOptions = (datasetColumns) => {
  const transformedColumns = datasetColumns.map((column) => ({
    uuid: column.name,
    name: column.name,
  }));

  return transformedColumns;
};

/**
 * Configure Operators
 * Method to configure operators
 *
 * @param {object[]} tasks tasks list
 * @param {object[]} operators operators list
 * @param {object[]} datasetColumns dataset columns list
 * @returns {object[]} configured operators
 */
const configureOperators = (tasks, operators, datasetColumns) => {
  // transforming dataset columns to feature parameter options
  const featureOptions = transformColumnsInParameterOptions(datasetColumns);

  // creating configured operators
  const configuredOperators = operators.map((operator) => {
    // getting task data
    const { parameters: taskParameters, tags, ...restTaskData } = getTaskData(
      tasks,
      operator.taskId
    );

    // check if operator is dataset
    const isDataset = tags.includes('DATASETS');

    // configuring operator parameters
    const parameters = configureOperatorParameters(
      taskParameters,
      operator.parameters,
      featureOptions,
      isDataset
    );

    // checking if operator is setted up
    const settedUp = checkOperatorSettedUp(operator);

    return {
      ...operator,
      ...restTaskData,
      parameters,
      settedUp,
      selected: false,
      status: operator.status,
      tags,
    };
  });

  return configuredOperators;
};

/**
 * Check Operator Setted Up
 * Function to check if operator is setted up
 *
 * @param {object[]} operator
 * @returns {boolean} operator is setted up?
 */
const checkOperatorSettedUp = (operator) => {
  return operator.status === 'Setted up' ? true : false;
};

/**
 * Select Operator
 * Method to select operator or deselect all operators
 *
 * @param {string} operatorId operators list * omit/null this to deselect all *
 * @param {object[]} operators operators list
 * @returns {object[]} new operators list
 */
const selectOperator = (operatorId, operators) => {
  // creating new operators list
  const newOperators = operators.map((operator) =>
    operator.uuid === operatorId
      ? { ...operator, selected: true }
      : { ...operator, selected: false }
  );

  return newOperators;
};

/**
 * Transform Results
 *
 * Method to transform operator results
 *
 * @param {string} operatorId operators list * omit/null this to deselect all *
 * @param {string[]} results operators plot result list
 * @returns {object[]} new results list
 */
const transformResults = (operatorId, results) => {
  // creating new operators list
  const newResults = results.map((plotResult, index) => ({
    type: 'plot',
    uuid: `plot_${operatorId}_${index}`,
    plotUrl: plotResult,
  }));

  return newResults;
};

const getErrorMessage = (error) => {
  let msg = error.message;
  if (error.response && error.response.data && error.response.data.message)
    msg = error.response.data.message;
  return msg;
};

/**
 * Get dataset name
 *
 * @param {object[]} tasks tasks
 * @param {object[]} operators experiment operators
 * @returns {string} dataset name
 */
const getDatasetName = (tasks, operators) => {
  const datasetTasks = tasks
    .filter((i) => {
      return i.tags.includes('DATASETS');
    })
    .map((task) => task.uuid);
  const datasetOperator = operators.find((i) => {
    return datasetTasks.includes(i.taskId);
  });
  let datasetName = undefined;
  if (datasetOperator) {
    const parameters = datasetOperator.parameters;
    if (parameters instanceof Array) {
      datasetName = parameters.find((i) => i.name === 'dataset')?.value;
    } else {
      datasetName = parameters.dataset;
    }
  }
  return datasetName;
};

/**
 * Sleep method
 *
 * @param {int} milliseconds
 * @returns {Promise}
 */
const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

/**
 * Check whenever a dataset has featuretypes
 *
 * @param {object} dataset
 * @returns {boolean}
 */
const hasFeaturetypes = (dataset) => {
  if (hasOwnProperty.call(dataset, 'columns')) {
    const columns = [...dataset.columns];
    const hasFeatureTypes = columns.some((column) =>
      hasOwnProperty.call(column, 'featuretype')
    );

    if (hasFeatureTypes) return true;
  }
  return false;
};

/**
 * Get featuretypes from a dataset
 *
 * @param {object} dataset
 * @returns {string}
 */
const getFeaturetypes = (dataset) => {
  if (hasFeaturetypes(dataset)) {
    const featuretypes = [...dataset.columns].map((column) => {
      return column.featuretype;
    });

    return featuretypes.toString().replace(/,/g, '\n');
  }
  return false;
};

/**
 * Checks if a response is one of the supported binary file types (video and image)
 *
 * @param {object} response response from Seldon
 * @returns {boolean} if a response includes a encoded base64 string or not
 */
const isSupportedBinaryData = (response) => {
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
const isImage = (response) => {
  const contentType = response.meta?.tags?.['content-type'];

  return Boolean(contentType) && contentType.includes('image/');
};

/**
 * Transform a string into base64 format.
 *
 * @param {string} data String
 * @returns {string} a string with in base64 format
 */
const formatBase64 = (data) => {
  return `data:${data.meta.tags['content-type']};base64,${data.binData}`;
};

/**
 * Transform a tabular data or a binary data to a plain text.
 *
 * @param {object} strEncoded Seldon object response
 * @returns {string} a string with Seldon response
 */
const toRawText = (strEncoded) => {
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
 */
const copyToClipboard = (experimentInference) => {
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
 * @returns {string} content as base64
 */
const downloadFile = (experimentInference) => {
  return isSupportedBinaryData(experimentInference)
    ? formatBase64(experimentInference)
    : `data:text/plain;base64,${btoa(toRawText(experimentInference))}`;
};

const formatCompareResultDate = (date) => {
  var options = {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  };
  const formatDate = new Date(date).toLocaleDateString(undefined, options);
  var rest = formatDate.substring(0, formatDate.lastIndexOf(' ') + 1);
  var last = formatDate.substring(
    formatDate.lastIndexOf(' ') + 1,
    formatDate.length
  );
  return rest + ', ' + last;
};

/**
 * Format results parameters to use label from parameter and value from training
 *
 * @param parameters
 * @param parametersTraining
 */
const formatResultsParameters = (parameters, parametersTraining) => {
  const resultsParameters = [];
  if (parameters) {
    for (const operatorParameter of parameters) {
      let valueTraining = parametersTraining
        ? parametersTraining[operatorParameter.name]
        : null;
      if (Array.isArray(valueTraining)) {
        valueTraining = valueTraining.join();
      }
      if (typeof valueTraining === 'boolean') {
        valueTraining = valueTraining.toString();
      }
      resultsParameters.push({
        name: operatorParameter.label
          ? operatorParameter.label
          : operatorParameter.name,
        value: valueTraining,
      });
    }
  }
  return resultsParameters;
};

const retrieveStatusMessageFromOperators = (operators) => {
  operators.map(
    (operator) =>
      operator.statusMessage &&
      notification.open({
        message: operator?.task?.name,
        description: operator.statusMessage,
      })
  );
};

// EXPORT DEFAULT
export default {
  deleteExperiment,
  organizeExperiments,
  filterMenu,
  createMenu,
  getTagConfig,
  getTaskData,
  configureOperators,
  configureOperatorParameters,
  selectOperator,
  transformResults,
  checkOperatorSettedUp,
  getErrorMessage,
  transformColumnsInParameterOptions,
  getDatasetName,
  sleep,
  hasFeaturetypes,
  getFeaturetypes,
  isSupportedBinaryData,
  isImage,
  formatBase64,
  toRawText,
  formatCompareResultDate,
  formatResultsParameters,
  copyToClipboard,
  downloadFile,
  retrieveStatusMessageFromOperators,
};
