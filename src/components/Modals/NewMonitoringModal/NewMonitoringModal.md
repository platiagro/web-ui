**Exemplo:**

```js
const [visible, setVisible] = React.useState(false);
const errorMessage = 'Mensagem de error!';
const loading = false;
const validateStatus = null; // set to 'error' to show error message
const onClose = () => {
  setVisible(false);
};
const onConfirm = () => {
  console.log('onConfirm');
};
<div>
  <button onClick={() => setVisible(true)}>Open modal</button>
  <NewMonitoringModal
    errorMessage={errorMessage}
    loading={loading}
    onClose={onClose}
    onConfirm={onConfirm}
    validateStatus={validateStatus}
    visible={visible}
  />
</div>;
```
