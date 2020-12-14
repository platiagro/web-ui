**Exemplo:**

```js
const [visible, setVisible] = React.useState(false);
const errorMessage = 'Mensagem de error!';
const handleCloseModal = () => {
  setVisible(false);
};
const handleNewTab = () => {
  console.log('handleNewTab');
};
const itemLabel = 'Qual o nome da sua aba?';
const initialValue = 'Nova aba';
const ruleMessage = 'Por favor insira um nome para a aba!';
const title = 'Nova aba';

<div>
  <button onClick={() => setVisible(true)}>Open modal</button>
  <NewTabModal
    errorMessage={errorMessage}
    handleCloseModal={handleCloseModal}
    handleNewTab={handleNewTab}
    itemLabel={itemLabel}
    initialValue={initialValue}
    ruleMessage={ruleMessage}
    title={title}
    visible={visible}
  />
</div>;
```
