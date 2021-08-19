const TASK_CATEGORIES = {
  DEFAULT: {
    key: 'DEFAULT',
    name: 'Minhas Tarefas',
  },
  DATASETS: {
    key: 'DATASETS',
    name: 'Conjunto de dados',
  },
  DESCRIPTIVE_STATISTICS: {
    key: 'DESCRIPTIVE_STATISTICS',
    name: 'Visualização de Dados',
  },
  FEATURE_ENGINEERING: {
    key: 'FEATURE_ENGINEERING',
    name: 'Engenharia de Atributos',
  },
  PREDICTOR: {
    key: 'PREDICTOR',
    name: 'Treinamento',
  },
  COMPUTER_VISION: {
    key: 'COMPUTER_VISION',
    name: 'Visão Computacional',
  },
  NLP: {
    key: 'NLP',
    name: 'Texto e Linguagem',
  },
  MONITORING: {
    key: 'MONITORING',
    name: 'Monitoramento',
  },
  TEMPLATES: {
    key: 'TEMPLATES',
    name: 'Templates',
  },
};

const TASK_CATEGORIES_WITHOUT_TEMPLATES = { ...TASK_CATEGORIES };
delete TASK_CATEGORIES_WITHOUT_TEMPLATES.TEMPLATES;

export { TASK_CATEGORIES, TASK_CATEGORIES_WITHOUT_TEMPLATES };
