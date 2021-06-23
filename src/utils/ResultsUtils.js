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
 * @returns {string} formatted compare results date
 */
export const formatCompareResultDate = (date) => {
  const options = {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  };

  const formatDate = new Date(date).toLocaleDateString(undefined, options);
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
