**Default**

```js
const tasksFlowData = [
  {
    uuid: 'id01',
    name: 'Contagem de grãos de milho',
    isMarketPlace: false,
    description: 'Contagem de grãos a partir de imagens de espigas de milho.',
    types: ['EXPERIMENT', 'DEPLOYMENT'],
    user: {
      username: 'platiagro',
      avatarColor: '#389E0D',
    },
  },
  {
    uuid: 'id02',
    name: 'Predição do preço de frutas',
    isMarketPlace: false,
    description:
      'Preve o preço de frutas utilizando dados históricos relacionados ao preço das frutos no...',
    types: ['EXPERIMENT'],
    user: {
      username: 'fabiol',
      avatarColor: '#1890FF',
    },
  },
  {
    uuid: 'id03',
    name: 'Predição de falha em máquina',
    isMarketPlace: true,
    description: 'Predição de falha em máquina agrícola do tipo XYZ.',
    types: ['DEPLOYMENT'],
    user: {
      username: 'empresaXYZ',
      avatarColor: '#722ED1',
    },
  },
];

const containerStyle = { margin: '20px' };

const handleDelete = (deletedItems) => {
  alert(`Templates deletados: ${deletedItems}`);
};

<div style={containerStyle}>
  <TasksFlowTable onDelete={handleDelete} tasksFlowData={tasksFlowData} />
</div>;
```
