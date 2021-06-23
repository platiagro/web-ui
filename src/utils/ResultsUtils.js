/**
 * Transform Results
 *
 * Method to transform operator results
 *
 * @param {string} operatorId operators list * omit/null this to deselect all *
 * @param {string[]} results operators plot result list
 * @returns {object[]} new results list
 */
export const transformResults = (operatorId, results) => {
  // creating new operators list
  const newResults = results.map((plotResult, index) => ({
    type: 'plot',
    uuid: `plot_${operatorId}_${index}`,
    plotUrl: plotResult,
  }));

  return newResults;
};

/**
 * Format results parameters to use label from parameter and value from training
 *
 * @param {Date} date COmpare results date
 * @returns {string} Formatted compare results date
 */
export const formatCompareResultDate = (date) => {
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
 * @param {object} parameters Parameters
 * @param {object} parametersTraining Parameters training
 * @returns {Array} Results parameters
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
