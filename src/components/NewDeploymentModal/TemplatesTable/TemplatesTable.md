<!-- FIXME: Ajustar dados e nomes para refletirem a realidade -->
**Exemplo:**

```js
const templatesData = [
  { 
    uuid: 'id01',
    name: 'Contagem de grãos de milho',
    description: 'Contagem de grãos a partir de imagens de espigas de milho.',
    user: {
      username: 'platiagro',
      avatarColor: '#389E0D'
    },
  },
  { 
    uuid: 'id02',
    name: 'Predição do preço de frutas',
    description: 'Preve o preço de frutas utilizando dados históricos relacionados ao preço das frutos no...',
    user: {
      username: 'fabiol',
      avatarColor: '#1890FF'
    },
  },
  { 
    uuid: 'id03',
    name: 'Predição de falha em máquina',
    description: 'Predição de falha em máquina agrícola do tipo XYZ.',
    user: {
      username: 'empresaXYZ',
      avatarColor: '#722ED1'
    },
  }
];

const containerStyle = { margin: '20px' };

const handleSelect = (selectedUuid) => alert(`Template selecionado: ${selectedUuid}`);

<div style={containerStyle}>
  <TemplatesTable onSelect={handleSelect} templatesData={templatesData} />
</div>
```