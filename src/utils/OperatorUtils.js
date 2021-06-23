import { getTaskData } from './TaskUtils';

/**
 * Select operator or deselect all operators
 *
 * @param {string} operatorId operators list * omit/null this to deselect all *
 * @param {object[]} operators operators list
 * @returns {object[]} new operators list
 */
export const selectOperator = (operatorId, operators) => {
  return operators.map((operator) =>
    operator.uuid === operatorId
      ? { ...operator, selected: true }
      : { ...operator, selected: false }
  );
};

/**
 * Get dataset name
 *
 * @param {object[]} tasks tasks
 * @param {object[]} operators experiment operators
 * @returns {string} dataset name
 */
export const getDatasetName = (tasks, operators) => {
  let datasetName = undefined;

  if (tasks) {
    const datasetTasks = tasks
      .filter((i) => i.tags.includes('DATASETS'))
      .map((task) => task.uuid);

    const datasetOperator = operators.find((i) => {
      return datasetTasks.includes(i.taskId);
    });

    if (datasetOperator) {
      const parameters = datasetOperator.parameters;
      if (parameters instanceof Array) {
        datasetName = parameters.find((i) => i.name === 'dataset')?.value;
      } else {
        datasetName = parameters.dataset;
      }
    }
  } else {
    operators.forEach((operator) => {
      if (operator.task.tags.includes('DATASETS')) {
        datasetName = operator.parameters.dataset;
      }
    });
  }

  return datasetName;
};

/**
 * Check whenever a dataset has featuretypes
 *
 * @param {object} dataset Dataset
 * @returns {boolean} Has feature types
 */
export const hasFeaturetypes = (dataset) => {
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
 * @param {object} dataset Dataset
 * @returns {string} feature types
 */
export const getFeaturetypes = (dataset) => {
  if (hasFeaturetypes(dataset)) {
    const featuretypes = [...dataset.columns].map((column) => {
      return column.featuretype;
    });

    return featuretypes.toString().replace(/,/g, '\n');
  }

  return false;
};

/**
 * Map to change param value
 *
 * @param {object} operatorParameters operator parameters
 * @param {string} parameterValue parameter value
 * @param {string} parameterName parameter name
 * @returns {object} parameter
 */
export const successOperatorMap = (
  operatorParameters,
  parameterValue,
  parameterName
) => {
  return operatorParameters.map((parameter) => {
    const validParameterValue = parameterValue || undefined;
    const isThisParameter = parameter.name === parameterName;
    const newValue = isThisParameter ? validParameterValue : parameter.value;

    return {
      ...parameter,
      value: newValue,
    };
  });
};

/**
 * Function to filter operators by parameter name
 *
 * @param {object} operator Operator
 * @param {string} parameterName Parameter Name
 * @returns {object} Operator filtered
 */
export const filterOperatorParameters = (operator, parameterName) => {
  return operator.parameters.filter((parameter) => {
    return parameter.name === parameterName || !!parameter.value;
  });
};
/**
 * Transform dataset columns in feature type parameter options
 *
 * @param {object[]} datasetColumns dataset columns list
 * @returns {object[]} transformed columns
 */
export const transformColumnsInParameterOptions = (datasetColumns) => {
  return datasetColumns.map((column) => ({
    uuid: column.name,
    name: column.name,
  }));
};

/**
 * Configure operators
 *
 * @param {object[]} tasks tasks list
 * @param {object[]} operators operators list
 * @param {object[]} datasetColumns dataset columns list
 * @returns {object[]} configured operators
 */
export const configureOperators = (tasks, operators, datasetColumns) => {
  const featureOptions = transformColumnsInParameterOptions(datasetColumns);

  const configuredOperators = operators.map((operator) => {
    const {
      parameters: taskParameters,
      tags,
      ...restTaskData
    } = getTaskData(tasks, operator.taskId, operator.task);

    const isDataset = tags.includes('DATASETS');

    const parameters = configureOperatorParameters(
      taskParameters,
      operator.parameters,
      featureOptions,
      isDataset
    );

    const settedUp = checkOperatorSettedUp(operator);

    return {
      ...restTaskData,
      ...operator,
      parameters,
      settedUp,
      selected: false,
      tags,
    };
  });

  return configuredOperators;
};

/**
 * Check operator is setted up
 *
 * @param {object[]} operator operator
 * @returns {boolean} operator is setted up?
 */
export const checkOperatorSettedUp = (operator) => {
  return operator.status === 'Setted up';
};

/**
 * Configure operator parameters
 *
 * @param {object[]} taskParameters task parameters
 * @param {object} operatorParameters operator parameters
 * @param {object[]} featureOptions feature options
 * @param {boolean} isDataset is dataset
 * @returns {object[]} configured operator parameters
 */
export const configureOperatorParameters = (
  taskParameters,
  operatorParameters,
  featureOptions,
  isDataset
) => {
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
