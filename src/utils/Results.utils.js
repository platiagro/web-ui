/**
 * Transform operator results
 *
 * @param {string} operatorId operators list * omit/null this to deselect all *
 * @param {string[]} results operators plot result list
 * @returns {object[]} new results list
 */
export const transformResults = (operatorId, results) => {
  return results.map((plotResult, index) => ({
    type: 'plot',
    uuid: `plot_${operatorId}_${index}`,
    plotUrl: plotResult,
  }));
};

/**
 * Format results parameters to use label from parameter and value from training
 *
 * @param {Date} date compare results date
 * @param {string} locale compare results date locale
 * @returns {string} formatted compare results date
 */
export const formatCompareResultDate = (date, locale) => {
  const options = {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  };

  const formatDate = new Date(date).toLocaleDateString(locale, options);
  const rest = formatDate.substring(0, formatDate.lastIndexOf(' ') + 1);
  const last = formatDate.substring(
    formatDate.lastIndexOf(' ') + 1,
    formatDate.length
  );

  return rest + ', ' + last;
};

/**
 * Format results parameters to use label from parameter and value from training
 *
 * @param {object} parameters parameters
 * @param {object} parametersTraining parameters training
 * @returns {Array} results parameters
 */
export const formatResultsParameters = (parameters, parametersTraining) => {
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

/**
 * Download the experiment run results
 *
 * @param {object} params parameters
 * @param {string} params.projectId project id
 * @param {string} params.experimentId experiment id
 * @param {string} params.runId run id
 * @param {string} params.operatorId operator id
 */
export const downloadExperimentRunResult = ({
  projectId,
  experimentId,
  runId,
  operatorId,
}) => {
  const urlParts = [
    process.env.REACT_APP_PROJECTS_API,
    'projects',
    projectId,
    'experiments',
    experimentId,
    'runs',
    runId,
    'operators',
    operatorId,
    'results',
  ];

  window.open(urlParts.join('/'), '_blank');
};

/**
 * Format tensor values with a given shape
 *
 * @param {Array} values array of values
 * @param {Array} shape has this format: [numberOfRows, numberOfColumns]
 * @returns {Array} formatted values or empty array
 */
export const formatTensorValues = (values, shape) => {
  if (shape?.length === 2 && values?.length > 0) {
    const [numberOfRows, numberOfColumns] = shape;
    return new Array(numberOfRows).fill([]).map((_, rowIndex) => {
      return values.slice(
        rowIndex * numberOfColumns,
        (rowIndex + 1) * numberOfColumns
      );
    });
  }

  return values || [];
};
