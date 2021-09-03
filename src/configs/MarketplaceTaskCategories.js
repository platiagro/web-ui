export const MARKETPLACE_TASK_CATEGORIES = {
  DATASETS: {
    key: 'DATASETS',
    color: '#FF9C6E',
    name: 'Conjunto de dados',
    description: `Reúne dados sobre um mesmo assunto e pode ser utilizado para testar e treinar modelos.`,
  },
  FEATURE_ENGINEERING: {
    key: 'FEATURE_ENGINEERING',
    color: '#FFD666',
    name: 'Engenharia de atributos',
    description: `Melhora a precisão dos modelos manipulando o conjunto de dados que será utilizado por ele. As técnicas podem ser de aumento, seleção ou transformação dos dados.`,
  },
  PREDICTOR: {
    key: 'PREDICTOR',
    color: '#FFF566',
    name: 'Treinamento',
    description: `Treina modelos de inteligência artificial para reconhecer e aprender padrões a partir de um conjunto de dados.`,
  },
  DESCRIPTIVE_STATISTICS: {
    key: 'DESCRIPTIVE_STATISTICS',
    color: '#D3F261',
    name: 'Visualização de dados',
    description: `Transforma os dados em formatos legíveis ou fornece outras formas de visualizar diferentes formatos de dados.`,
  },
  COMPUTER_VISION: {
    key: 'COMPUTER_VISION',
    color: '#5CDBD3',
    name: 'Visão computacional',
    description: `Algorítimos de Machine Learning que extraem informações de imagens ou outros dados multidimensionais.`,
  },
  OPTIMIZATION: {
    key: 'OPTIMIZATION',
    color: '#69C0FF',
    name: 'Otimização',
    description: `Fluxos de tradução das principais características do problema de negócios que precisa ser solucionado. O modelo possui, geralmente, uma função objetivo, as variáveis de decisão e as restrições de negócios.`,
  },
  OTHER: {
    key: 'OTHER',
    color: '#85A5FF',
    name: 'Outra categoria',
    description: `Fluxos que não se encaixam facilmente em nenhuma outra categoria. Eles geralmente resolvem problemas complexos que requerem várias tarefas.`,
  },
};
