const col = [
  {
    uuid: 'aa7f1ad9-9e3e-471c-9ce6-8fb8f2a14105',
    headerId: 'ecaf9299-cfda-46d8-887e-31dd10a2907f',
    name: 'DATA',
    datatype: 'DateTime',
    position: 0,
  },
  {
    uuid: '73f243d8-ad20-4801-bf0f-1e3d77dcfaf8',
    headerId: 'ecaf9299-cfda-46d8-887e-31dd10a2907f',
    name: 'Item_Name',
    datatype: 'factor',
    position: 1,
  },
  {
    uuid: '3d2dbe98-c7f1-48d1-b6d9-0467f9b92d4a',
    headerId: 'ecaf9299-cfda-46d8-887e-31dd10a2907f',
    name: 'Item_Name2',
    datatype: 'factor',
    position: 2,
  },
  {
    uuid: 'b1be9744-5253-4394-a90b-a8b9418098fe',
    headerId: 'ecaf9299-cfda-46d8-887e-31dd10a2907f',
    name: 'cotacao_dolar',
    datatype: 'numeric',
    position: 3,
  },
  {
    uuid: 'ce138be2-976f-477d-a6d1-daee466490db',
    headerId: 'ecaf9299-cfda-46d8-887e-31dd10a2907f',
    name: 'Producao_estimada',
    datatype: 'numeric',
    position: 4,
  },
  {
    uuid: 'cb39498c-930e-40d9-952c-6fc071acc0c9',
    headerId: 'ecaf9299-cfda-46d8-887e-31dd10a2907f',
    name: 'Producao_perdida_ciclo_anterior_por_doenca_ou_praga',
    datatype: 'numeric',
    position: 5,
  },
  {
    uuid: '3b15eb83-b312-4a3a-b9a1-fd756e4b5065',
    headerId: 'ecaf9299-cfda-46d8-887e-31dd10a2907f',
    name: 'Inflacao_acumulada_mensal',
    datatype: 'numeric',
    position: 6,
  },
  {
    uuid: 'ab4f07a4-66a2-4cc3-94d1-02a5aaa23432',
    headerId: 'ecaf9299-cfda-46d8-887e-31dd10a2907f',
    name: 'Temperatura_media',
    datatype: 'numeric',
    position: 7,
  },
  {
    uuid: '1c98892b-9e52-44b5-a0d4-d7db4f8fe2e8',
    headerId: 'ecaf9299-cfda-46d8-887e-31dd10a2907f',
    name: 'Chuvaem_mm',
    datatype: 'numeric',
    position: 8,
  },
  {
    uuid: 'edf112fa-2e4c-49cd-bb0d-e8ba79ef6374',
    headerId: 'ecaf9299-cfda-46d8-887e-31dd10a2907f',
    name: 'Probabilidade_de_precipitacao',
    datatype: 'numeric',
    position: 9,
  },
  {
    uuid: '951e1239-4d59-4a56-97f3-af6f09586b30',
    headerId: 'ecaf9299-cfda-46d8-887e-31dd10a2907f',
    name: 'Niveis_de_conforto_em_umidade',
    datatype: 'numeric',
    position: 10,
  },
  {
    uuid: 'd26dbe8f-5d5f-4f4d-9baa-3f4b4d8020d6',
    headerId: 'ecaf9299-cfda-46d8-887e-31dd10a2907f',
    name: 'cotacao_rub_ind',
    datatype: 'numeric',
    position: 11,
  },
  {
    uuid: 'd8d3598b-2737-4712-906f-ae7cc0e1f663',
    headerId: 'ecaf9299-cfda-46d8-887e-31dd10a2907f',
    name: 'defensivos_unidade_hc',
    datatype: 'numeric',
    position: 12,
  },
];

// Exemplo do envio
//       //   pipeline_spec: {
//       //     parameters: [
//       //       {
//       //         name: 'experiment-id',
//       //         value: 'autofeaturing-automl/fruits',
//       //       },
//       //       {
//       //         name: 'bucket',
//       //         value: 'mlpipeline',
//       //       },
//       //       {
//       //         name: 'csv',
//       //         value: 'Fruit_India_v3.csv',
//       //       },
//       //       {
//       //         name: 'txt',
//       //         value: 'fruits.txt',
//       //       },
//       //       {
//       //         name: 'target',
//       //         value: 'price_alvo',
//       //       },
//       //       {
//       //         name: 'date',
//       //         value: 'DATA',
//       //       },
//       //       {
//       //         name: 'date-format',
//       //         value: '%Y-%m-%d',
//       //       },
//       //       {
//       //         name: 'feature-temporal-group',
//       //         value: 'Item_Name',
//       //       },
//       //       {
//       //         name: 'feature-temporal-period',
//       //         value: 'month',
//       //       },
//       //       {
//       //         name: 'preselection-1-na-cutoff',
//       //         value: '0.1',
//       //       },
//       //       {
//       //         name: 'preselection-1-correlation-cutoff',
//       //         value: '0.7',
//       //       },
//       //       {
//       //         name: 'feature-tools-group',
//       //         value: 'Item_Name',
//       //       },
//       //       {
//       //         name: 'preselection-2-na-cutoff',
//       //         value: '0.1',
//       //       },
//       //       {
//       //         name: 'preselection-2-correlation-cutoff',
//       //         value: '0.7',
//       //       },
//       //       {
//       //         name: 'filter-columns',
//       //         value: 'DATA',
//       //       },
//       //       {
//       //         name: 'automl-time-limit',
//       //         value: '300',
//       //       },
//       //     ],
//       //     pipeline_id: {
//       //       training: 'e96a10ef-e81b-4391-ada7-7c90ace6a6c6',
//       //       deployment: 'e96a10ef-e81b-4391-ada7-7c90ace6a6c6',
//       //     },
//       //   },
//       // },
export default col;
