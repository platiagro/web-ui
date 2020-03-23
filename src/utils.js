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

  return menu;
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
  if (components.length > 0 && componentId) {
    // getting components data
    const componentData = components.find(
      (component) => component.uuid === componentId
    );
    const { name, tags } = componentData;

    // getting icon
    const { icon } = getTagConfig(tags[0]);

    // returning component data
    return { name, icon };
  }
};

/**
 * Configure Operators
 * Method to configure operators
 * @param {Object[]} components components list
 * @param {Object[]} operators operators list
 * @returns {Object[]} configured operators
 */
const configureOperators = (components, operators) => {
  // creating configured operators
  const configuredOperators = operators.map((operator) => ({
    ...operator,
    ...getComponentData(components, operator.componentId),
  }));

  return configuredOperators;
};

/**
 * Delect Operator
 * Method to select operator or deselect all operators
 * @param {string} operatorId operators list * omit/null this to deselect all *
 * @param {Object[]} operators operators list
 * @returns {Object[]} new operators list
 */
const selectOperator = (operatorId, operators) => {
  // creating new operators list
  const newOperators = operators.map((operator) =>
    operator.uuid === operatorId ? { ...operator, selected: true } : operator
  );

  return newOperators;
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
  selectOperator,
};
