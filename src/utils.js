/**
 * Delete Experiment
 * Method to delete experiment and reorganize list
 * @param {Object[]} experiments experiments list
 * @param {string} experimentId deleted experiment id
 * @returns {Object[]} new experiments list
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
 * @param {Object[]} experiments experiments list
 * @param {string} dragExperimentId drag experiment id
 * @param {string} hoverExperimentId hover experiment id
 * @returns {Object[]} new experiments list
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
 * Method to filter components list
 * @param {Object} menu menu object
 * @param {string} filter filter
 * @returns {Object} filtered menu
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
 * @param {Object[]} components components list
 * @returns {Object} menu object
 */
const createMenu = (components) => {
  // menu object constant
  const menu = {};
  // sorted menu
  const sortedMenu = {};

  // creating menu object
  components.forEach((component) => {
    // getting component data
    const { uuid, description, name } = component;
    // mapping submenus
    component.tags.forEach((tag) => {
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
 * @param {string} tag tag string
 * @returns {Object} tag config object
 */
const getTagConfig = (tag) => {
  // TAGS CONFIG
  const tagsConfig = {
    // user components
    DEFAULT: { title: 'Meus Componentes', key: 'DEFAULT', icon: 'solution' },
    // datasets
    DATASETS: { title: 'Conjunto de dados', key: 'DATASETS', icon: 'database' },
    // descriptive statistics
    DESCRIPTIVE_STATISTICS: {
      title: 'Visualização de Dados',
      key: 'DESCRIPTIVE_STATISTICS',
      icon: 'area-chart',
    },
    // feature engineering
    FEATURE_ENGINEERING: {
      title: 'Engenharia de Atributos',
      key: 'FEATURE_ENGINEERING',
      icon: 'control',
    },
    // training
    PREDICTOR: { title: 'Treinamento', key: 'PREDICTOR', icon: 'share-alt' },
    // templates
    TEMPLATES: { title: 'Templates', key: 'TEMPLATES', icon: 'file' },
  };

  return tagsConfig[tag];
};

/**
 * Get Component Data
 * Method to get component data
 * @param {Object[]} components components list
 * @param {string} componentId component id
 * @returns {Object} component data
 */
const getComponentData = (components, componentId) => {
  // params to filter constant
  const parametersToFilter = [
    'dataset',
    //'target',
    'experiment_id',
    'operator_id',
  ];

  if (components.length > 0 && componentId) {
    // getting components data
    const componentData = components.find(
      (component) => component.uuid === componentId
    );
    const {
      name,
      commands,
      tags,
      experimentNotebookPath,
      deploymentNotebookPath,
      parameters,
    } = componentData;

    let filteredParams;

    if (parameters) {
      // filtering params
      filteredParams = parameters.filter(
        (parameter) => !parametersToFilter.includes(parameter.name)
      );
    }

    // getting icon
    const { icon } = getTagConfig(tags[0]);

    // returning component data
    return {
      name,
      icon,
      commands,
      tags,
      experimentNotebookPath,
      deploymentNotebookPath,
      parameters: filteredParams,
    };
  }

  return null;
};

/**
 * Configure Operator Parameters
 *
 * Method to configure operator parameters
 *
 * @param {Object[]} componentParameters
 * @param {Object} operatorParameters
 * @param {Object[]} featureOptions
 * @returns {Object[]} configured operator parameters
 */
const configureOperatorParameters = (
  componentParameters,
  operatorParameters,
  featureOptions
) => {
  const configuredOperatorParameters = componentParameters.map((parameter) => {
    return {
      ...parameter,
      options: parameter.options
        ? parameter.options
        : parameter.type === 'feature'
        ? featureOptions
        : undefined,
      value:
        parameter.name in operatorParameters
          ? parameter.type === 'feature' || parameter.multiple
            ? operatorParameters[parameter.name].split(',').filter((el) => {
                return el !== '';
              })
            : operatorParameters[parameter.name]
          : parameter.type === 'feature' || parameter.multiple
          ? []
          : parameter.default,
    };
  });

  return configuredOperatorParameters;
};

/**
 * Transform Columns In Parameter Options
 *
 * Method to transform dataset columns in feature type parameter options
 *
 * @param {Object[]} datasetColumns dataset columns list
 * @returns {Object[]} transformed columns
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
 * @param {Object[]} components components list
 * @param {Object[]} operators operators list
 * @param {Object[]} datasetColumns dataset columns list
 * @param {Object} pipelineStatus pipeline status object
 * @returns {Object[]} configured operators
 */
const configureOperators = (
  components,
  operators,
  datasetColumns,
  pipelineStatus
) => {
  // transforming dataset columns to feature parameter options
  const featureOptions = transformColumnsInParameterOptions(datasetColumns);

  // creating configured operators
  const configuredOperators = operators.map((operator) => {
    // getting component data
    const {
      parameters: componentParameters,
      ...restComponentData
    } = getComponentData(components, operator.componentId);

    // configuring operator parameters
    const parameters = configureOperatorParameters(
      componentParameters,
      operator.parameters,
      featureOptions
    );

    // checking if operator is setted up
    const settedUp = checkOperatorSettedUp(operator);

    let status = '';
    if (pipelineStatus.status && pipelineStatus.status[operator]) {
      status = pipelineStatus.status[operator];
    }

    return {
      ...operator,
      ...restComponentData,
      parameters,
      settedUp,
      selected: false,
      status,
    };
  });

  return configuredOperators;
};

/**
 * Check Operator Setted Up
 * Function to check if operator is setted up
 * @param {Object[]} operator
 * @returns {boolean} operator is setted up?
 */
const checkOperatorSettedUp = (operator) => {
  return operator.status === 'Setted up' ? true : false;
};

/**
 * Select Operator
 * Method to select operator or deselect all operators
 * @param {string} operatorId operators list * omit/null this to deselect all *
 * @param {Object[]} operators operators list
 * @returns {Object[]} new operators list
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
 * @param {string} operatorId operators list * omit/null this to deselect all *
 * @param {string[]} results operators plot result list
 * @returns {Object[]} new results list
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

// EXPORT DEFAULT
export default {
  deleteExperiment,
  organizeExperiments,
  filterMenu,
  createMenu,
  getTagConfig,
  getComponentData,
  configureOperators,
  configureOperatorParameters,
  selectOperator,
  transformResults,
  checkOperatorSettedUp,
  getErrorMessage,
  transformColumnsInParameterOptions,
};
