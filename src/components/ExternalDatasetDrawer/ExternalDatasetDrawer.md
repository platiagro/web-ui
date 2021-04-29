**Exemplo:**

```js
const handleClickLearnMore = () => {
  alert('Clicked');
};
<ExternalDatasetDrawer
  propertyTitle='Tipo da fonte de dados'
  propertyTip='Dica'
  urlText='Url para cópia'
  onClickLearnMore={handleClickLearnMore}
  description='Um texto falando sobre como uma aplicação pode enviar dados para o fluxo (através de uma URL) a fim de testá-lo antes da implantação.'
/>;
```
