**Exemplo:**

```js
import PropertiesPanel from 'components/PropertiesPanel';
const handleChange = (e) => {
  console.log(e);
};

// <PropertiesPanel tip='Dica' title='Fonte de dados'>
<ExternalDatasetDrawer
  propertyTitle='Tipo da fonte de dados'
  propertyTip='Dica'
  handleChange={handleChange}
  urlText='url copiada'
  knowMoreUrl='/'
  description='Um texto falando sobre como uma aplicação pode enviar dados para o fluxo (através de uma URL) a fim de testá-lo antes da implantação.'
/>;
// </PropertiesPanel>;
```
