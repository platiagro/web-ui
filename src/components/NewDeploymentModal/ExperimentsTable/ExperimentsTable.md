**Exemplo:**

```js
import { useState } from 'react';

const [selectedRowKey, setSelectedRowKey] = useState('');

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

const handleSelect = (selectedArray) => {
  const selectedUuid = selectedArray[0];

  setSelectedRowKey(selectedUuid);

  alert(`Experimento selecionado: ${selectedUuid}`);
};

<div style={containerStyle}>
  <ExperimentsTable
    selectedRowKey={selectedRowKey} 
    onSelect={handleSelect} 
    experimentsData={experimentsData}
  />
</div>
```