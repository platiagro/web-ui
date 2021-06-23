import { getTaskData } from './TaskUtils';

/**
 * Select Operator
 * Method to select operator or deselect all operators
 *
 * @param {string} operatorId operators list * omit/null this to deselect all *
 * @param {object[]} operators operators list
 * @returns {object[]} new operators list
 */
export const selectOperator = (operatorId, operators) => {
  // creating new operators list
  const newOperators = operators.map((operator) =>
    operator.uuid === operatorId
      ? { ...operator, selected: true }
      : { ...operator, selected: false }
  );

  return newOperators;
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
      .filter((i) => {
        return i.tags.includes('DATASETS');
      })
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
 * @param {object} operatorParameters Operator Parameters
 * @param {string} parameterValue Parameter Value
 * @param {string} parameterName Parameter Name
 * @returns {object} Parameter
 */
export const successOperatorMap = (
  operatorParameters,
  parameterValue,
  parameterName
) => {
  return operatorParameters.map((parameter) => {
    const validParameterValue =
      parameterValue !== null ? parameterValue : undefined;

    const value =
      parameter.name === parameterName ? validParameterValue : parameter.value;

    return {
      ...parameter,
      value: value,
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
export const filterOperatorParameters = (operator, parameterName) =>
  operator.parameters.filter((parameter) => {
    if (parameter.name === parameterName) {
      return true;
    } else if (parameter.value !== undefined) {
      return true;
    } else {
      return false;
    }
  });

/**
 * Transform Columns In Parameter Options
 *
 * Method to transform dataset columns in feature type parameter options
 *
 * @param {object[]} datasetColumns dataset columns list
 * @returns {object[]} transformed columns
 */
export const transformColumnsInParameterOptions = (datasetColumns) => {
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
export const configureOperators = (tasks, operators, datasetColumns) => {
  // transforming dataset columns to feature parameter options
  const featureOptions = transformColumnsInParameterOptions(datasetColumns);

  // creating configured operators
  const configuredOperators = operators.map((operator) => {
    // getting task data
    const {
      parameters: taskParameters,
      tags,
      ...restTaskData
    } = getTaskData(tasks, operator.taskId, operator.task);

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
 * Check Operator Setted Up
 * Function to check if operator is setted up
 *
 * @param {object[]} operator Operator
 * @returns {boolean} operator is setted up?
 */
export const checkOperatorSettedUp = (operator) => {
  return operator.status === 'Setted up' ? true : false;
};

/**
 * Configure Operator Parameters
 *
 * Method to configure operator parameters
 *
 * @param {object[]} taskParameters Task parameters
 * @param {object} operatorParameters Operator parameters
 * @param {object[]} featureOptions Feature Options
 * @param {boolean} isDataset Is Dataset
 * @returns {object[]} configured operator parameters
 */
export const configureOperatorParameters = (
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
