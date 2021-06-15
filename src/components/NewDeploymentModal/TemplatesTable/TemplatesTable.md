**Default**

```js
const [selectedRowKey, setSelectedRowKey] = React.useState('');

const templatesData = [
  {
    uuid: 'id01',
    name: 'Contagem de grãos de milho',
    description: 'Contagem de grãos a partir de imagens de espigas de milho.',
    user: {
      userName: 'platiagro',
      avatarColor: '#389E0D',
    },
  },
  {
    uuid: 'id02',
    name: 'Predição do preço de frutas',
    description:
      'Preve o preço de frutas utilizando dados históricos relacionados ao preço das frutos no...',
    user: {
      userName: 'fabiol',
      avatarColor: '#1890FF',
    },
  },
  {
    uuid: 'id03',
    name: 'Predição de falha em máquina',
    description: 'Predição de falha em máquina agrícola do tipo XYZ.',
    user: {
      userName: 'empresaXYZ',
      avatarColor: '#722ED1',
    },
  },
];

const containerStyle = { margin: '20px' };

const handleSelect = (selectedArray) => {
  const selectedUuid = selectedArray[0];
  setSelectedRowKey(selectedUuid);
  alert(`Template selecionado: ${selectedUuid}`);
};

<div style={containerStyle}>
  <TemplatesTable
    selectedRowKey={selectedRowKey}
    onSelect={handleSelect}
    templatesData={templatesData}
  />
</div>;
```
