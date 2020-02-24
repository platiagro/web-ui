// GENERIC DRAWER MOCK
const genericDrawerMock = [
  // select
  {
    uuid: 'select1',
    type: 'select',
    title: 'Título Select',
    description: 'Essa é uma descrição de um input dinâmico',
    warning: 'Esse é um aviso de um input dinâmico',
    tip: 'Essa é uma dica de um input dinâmico',
    isMultiple: false,
    placeholder: 'Selecionar',
    options: [
      { uuid: 'opcao1', name: 'Opção 1' },
      { uuid: 'opcao2', name: 'Opção 2' },
      { uuid: 'opcao3', name: 'Opção 3' },
      { uuid: 'opcao4', name: 'Opção 4' },
    ],
  },
  // radio
  {
    uuid: 'radio1',
    type: 'radio',
    title: 'Título Radio',
    description: 'Essa é uma descrição de um input dinâmico',
    warning: 'Esse é um aviso de um input dinâmico',
    tip: 'Essa é uma dica de um input dinâmico',
    value: 'opcao1',
    options: [
      { uuid: 'opcao1', name: 'Opção 1' },
      { uuid: 'opcao2', name: 'Opção 2' },
      { uuid: 'opcao3', name: 'Opção 3' },
      { uuid: 'opcao4', name: 'Opção 4' },
    ],
  },
];

// EXPORT
export default genericDrawerMock;
