// RESULTS DRAWER MOCK
const resultsDrawerMock = [
  // tag result
  {
    uuid: 'results1',
    type: 'tag',
    title: 'Título Tag Result',
    tags: [
      { uuid: 'tag1', title: 'Tag 1' },
      { uuid: 'tag2', title: 'Tag 2' },
    ],
  },
  // table result
  {
    uuid: 'results2',
    type: 'table',
    title: 'Título Table Result',
    creationCounter: { before: 13, after: 15, difference: 2, percent: 15 },
    exhibitionCounter: { current: 10, total: 8786 },
    resultTable: {
      columns: [
        { title: 'Coluna 1', dataIndex: 'coluna1' },
        { title: 'Coluna 2', dataIndex: 'coluna2' },
        { title: 'Coluna 3', dataIndex: 'coluna3' },
        { title: 'Coluna 4', dataIndex: 'coluna4' },
        { title: 'Coluna 5', dataIndex: 'coluna5' },
      ],
      rows: [
        {
          key: 'data1',
          coluna1: 'Dado 1 Coluna 1',
          coluna2: 'Dado 1 Coluna 2',
          coluna3: 'Dado 1 Coluna 3',
          coluna4: 'Dado 1 Coluna 4',
          coluna5: 'Dado 1 Coluna 5',
        },
        {
          key: 'data2',
          coluna1: 'Dado 2 Coluna 1',
          coluna2: 'Dado 2 Coluna 2',
          coluna3: 'Dado 2 Coluna 3',
          coluna4: 'Dado 2 Coluna 4',
          coluna5: 'Dado 2 Coluna 5',
        },
        {
          key: 'data3',
          coluna1: 'Dado 3 Coluna 1',
          coluna2: 'Dado 3 Coluna 2',
          coluna3: 'Dado 3 Coluna 3',
          coluna4: 'Dado 3 Coluna 4',
          coluna5: 'Dado 3 Coluna 5',
        },
        {
          key: 'data4',
          coluna1: 'Dado 4 Coluna 1',
          coluna2: 'Dado 4 Coluna 2',
          coluna3: 'Dado 4 Coluna 3',
          coluna4: 'Dado 4 Coluna 4',
          coluna5: 'Dado 4 Coluna 5',
        },
        {
          key: 'data5',
          coluna1: 'Dado 5 Coluna 1',
          coluna2: 'Dado 5 Coluna 2',
          coluna3: 'Dado 5 Coluna 3',
          coluna4: 'Dado 5 Coluna 4',
          coluna5: 'Dado 5 Coluna 5',
        },
      ],
    },
  },
  // plot result
  {
    uuid: 'results3',
    type: 'plot',
    title: 'Título Plot Result',
    description: 'Essa é a descrição do resultado.',
    plotUrl:
      'https://scikit-learn.org/stable/_images/sphx_glr_plot_confusion_matrix_001.png',
  },
];

// EXPORT
export default resultsDrawerMock;
