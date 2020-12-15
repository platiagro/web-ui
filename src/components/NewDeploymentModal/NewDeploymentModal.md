**Exemplo:**

```js
import { useState } from 'react';

const [visible, setVisible] = useState(false);

const templatesData = [
  { 
    uuid: 'idTemplate01',
    name: 'Contagem de grãos de milho',
    description: 'Contagem de grãos a partir de imagens de espigas de milho.',
    user: {
      username: 'platiagro',
      avatarColor: '#389E0D'
    },
  },
  { 
    uuid: 'idTemplate02',
    name: 'Predição do preço de frutas',
    description: 'Preve o preço de frutas utilizando dados históricos relacionados ao preço das frutos no...',
    user: {
      username: 'fabiol',
      avatarColor: '#1890FF'
    },
  },
  { 
    uuid: 'idTemplate03',
    name: 'Predição de falha em máquina',
    description: 'Predição de falha em máquina agrícola do tipo XYZ.',
    user: {
      username: 'empresaXYZ',
      avatarColor: '#722ED1'
    },
  }
];

const experimentsData = [
  { 
    uuid: 'idExperimento01',
    name: 'Experimento 1'
  },
  { 
    uuid: 'idExperimento02',
    name: 'Experimento 2'
  },
];

const handleConfirm = (selectedUuid) => alert(`Criar: ${selectedUuid}`);

const handleCancel = () => setVisible(false);

const handleButtonClick = () => setVisible(true);

<div>
  <button onClick={handleButtonClick}>Exibir modal</button>
  <NewDeploymentModal
    visible={visible}
    experimentsData={experimentsData}
    templatesData={templatesData}
    onCancel={handleCancel}
    onConfirm={handleConfirm}
  />
</div>
```