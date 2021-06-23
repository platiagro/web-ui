import React from 'react';
import {
  FileOutlined,
  ReadOutlined,
  ControlOutlined,
  PictureOutlined,
  DatabaseOutlined,
  ShareAltOutlined,
  SolutionOutlined,
  AreaChartOutlined,
} from '@ant-design/icons';

/**
 * Filter Menu
 * Method to filter tasks list
 *
 * @param {object} menu menu object
 * @param {string} filter filter
 * @returns {object} filtered menu
 */
export const filterMenu = (menu, filter) => {
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
export const createMenu = (tasks) => {
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
export const getTagConfig = (tag) => {
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
 * @param {object=} task task object
 * @returns {object} task data
 */
export const getTaskData = (tasks, taskId, task = undefined) => {
  // params to filter constant
  const parametersToFilter = ['dataset'];

  if (tasks && tasks.length > 0 && taskId) {
    // getting tasks data
    const taskData = tasks.find((taskItem) => taskItem.uuid === taskId);
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

  if (task) {
    const { name, tags, parameters } = task;

    const { icon } = getTagConfig(tags[0]);

    let filteredParams;
    if (parameters) {
      filteredParams = parameters.filter(
        (parameter) => !parametersToFilter.includes(parameter.name)
      );
    }

    return {
      name,
      icon,
      tags,
      parameters: filteredParams,
    };
  }

  return null;
};
