**Exemplo:**

```js
const experimentsData = [
  { 
    uuid: 'id0001',
    name: 'Experimento 1'
  },
  { 
    uuid: 'id0002',
    name: 'Experimento 2'
  },
];

const containerStyle = { margin: '20px' };

const handleSelect = (selectedUuid) => alert(`Experimento selecionado: ${selectedUuid}`);

<div style={containerStyle}>
  <ExperimentsTable onSelect={handleSelect} experimentsData={experimentsData} />
</div>
```