// GENERIC DRAWER MOCK
const genericDrawerMock = [
  {
    uuid: 'select1',
    type: 'select',
    title: 'Selecione alguma coisa',
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
  {
    uuid: 'select2',
    type: 'select',
    title: 'Selecione alguma coisa 2',
    description: 'Essa é uma descrição de um input dinâmico',
    tip: 'Essa é uma dica de um input dinâmico',
    isMultiple: true,
    placeholder: 'Selecionar',
    value: [],
    options: [
      { uuid: 'opcao1', name: 'Opção 1' },
      { uuid: 'opcao2', name: 'Opção 2' },
      { uuid: 'opcao3', name: 'Opção 3' },
      { uuid: 'opcao4', name: 'Opção 4' },
    ],
  },
  {
    uuid: 'select3',
    type: 'select',
    title: 'Selecione alguma coisa 3',
    description: 'Essa é uma descrição de um input dinâmico',
    warning: 'Esse é um aviso de um input dinâmico',
    isMultiple: false,
    placeholder: 'Selecionar',
    value: 'opcao1',
    options: [
      { uuid: 'opcao1', name: 'Opção 1' },
      { uuid: 'opcao2', name: 'Opção 2' },
      { uuid: 'opcao3', name: 'Opção 3' },
      { uuid: 'opcao4', name: 'Opção 4' },
    ],
  },
  {
    uuid: 'select4',
    type: 'select',
    title: 'Selecione alguma coisa 4',
    description: 'Essa é uma descrição de um input dinâmico',
    isMultiple: true,
    placeholder: 'Selecionar',
    value: ['opcao1', 'opcao4'],
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
