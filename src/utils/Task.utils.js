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
 * Filter tasks list
 *
 * @param {object} menu menu object
 * @param {string} filter filter
 * @returns {object} filtered menu
 */
export const filterMenu = (menu, filter) => {
  if (!filter) return menu;

  const lowerCaseFilter = filter.toLowerCase();
  const filteredMenu = {};

  Object.entries(menu).forEach(([submenu, items]) => {
    const filteredItems = items.filter((item) => {
      const lowerCaseName = item.name.toLowerCase();
      return lowerCaseName.includes(lowerCaseFilter);
    });

    if (filteredItems.length > 0) filteredMenu[submenu] = filteredItems;
  });

  return filteredMenu;
};

/**
 * Create menu object
 *
 * @param {object[]} tasks tasks list
 * @returns {object} menu object
 */
export const createMenu = (tasks) => {
  const menu = {};
  const sortedMenu = {};

  tasks.forEach((task) => {
    const { uuid, description, name } = task;
    task.tags.forEach((tag) => {
      if (!menu[tag]) menu[tag] = [{ uuid, description, name }];
      else menu[tag].push({ uuid, description, name });
    });
  });

  Object.keys(menu)
    .sort()
    .forEach((submenu) => {
      sortedMenu[submenu] = menu[submenu];
    });

  return sortedMenu;
};

/**
 * Get Tag Config
 *
 * @param {string} tag tag string
 * @returns {object} tag config object
 */
export const getTagConfig = (tag) => {
  const tagsConfig = {
    DEFAULT: {
      title: 'Minhas Tarefas',
      key: 'DEFAULT',
      icon: <SolutionOutlined />,
    },
    DATASETS: {
      title: 'Conjunto de dados',
      key: 'DATASETS',
      icon: <DatabaseOutlined />,
    },
    DESCRIPTIVE_STATISTICS: {
      title: 'Visualização de Dados',
      key: 'DESCRIPTIVE_STATISTICS',
      icon: <AreaChartOutlined />,
    },
    FEATURE_ENGINEERING: {
      title: 'Engenharia de Atributos',
      key: 'FEATURE_ENGINEERING',
      icon: <ControlOutlined />,
    },
    PREDICTOR: {
      title: 'Treinamento',
      key: 'PREDICTOR',
      icon: <ShareAltOutlined />,
    },
    COMPUTER_VISION: {
      title: 'Visão Computacional',
      key: 'COMPUTER_VISION',
      icon: <PictureOutlined />,
    },
    NLP: {
      title: 'Texto e Linguagem',
      key: 'NLP',
      icon: <ReadOutlined />,
    },
    TEMPLATES: {
      title: 'Templates',
      key: 'TEMPLATES',
      icon: <FileOutlined />,
    },
  };

  return tagsConfig[tag] || null;
};

/**
 * Get task Data
 *
 * @param {object[]} tasks tasks list
 * @param {string} taskId task id
 * @param {object=} task task object
 * @returns {object} task data
 */
export const getTaskData = (tasks, taskId, task = undefined) => {
  const parametersToFilter = ['dataset'];

  if (tasks && tasks.length > 0 && taskId) {
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

    let filteredParams;
    if (parameters) {
      filteredParams = parameters.filter(
        (parameter) => !parametersToFilter.includes(parameter.name)
      );
    }

    const { icon } = getTagConfig(tags[0]);

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
