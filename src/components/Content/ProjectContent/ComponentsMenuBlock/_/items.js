const items = {
  template: [
    {
      name: 'Regressão Linear / Regressão Lógistica',
      databaseName: 'Linear Regression/Logistic Regression',
      pipelineTrainId: null,
      pipelineDeployId: null,
      disabled: false,
      default: false,
      template: 1,
    },
    {
      name: 'Auto Machine Learning',
      databaseName: 'AutoML',
      pipelineTrainId: null,
      pipelineDeployId: null,
      disabled: false,
      default: false,
      template: 2,
    },
    {
      name: 'Auto Featuring Com Regressão Linear / Regressão Lógistica',
      databaseName: 'AutoFeaturing + Linear Regression/Logistic Regression',
      pipelineTrainId: null,
      pipelineDeployId: null,
      disabled: false,
      default: false,
      template: 3,
    },
    {
      name: 'Auto Featuring Com Auto Machine Learning',
      databaseName: 'AutoFeaturing + AutoML',
      pipelineTrainId: null,
      pipelineDeployId: null,
      disabled: false,
      default: false,
      template: 4,
    },
  ],
  data: ['Conjunto de dados'],
  attr: [
    'Pré-seleção de atributos',
    'Seleção de atributos',
    'Criação de atributos por tempo',
    'Criação de atributos genéricas',
    'Filtro de atributos',
  ],
  train: ['AutoML', 'Regressão Logística', 'Regressão'],
};

export default items;
