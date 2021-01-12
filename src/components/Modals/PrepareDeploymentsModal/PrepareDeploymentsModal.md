**Exemplo:**

```js
const [visible, setVisible] = React.useState(false);
const loading = false;
const experiments = [
  { uuid: '1', name: 'Experimento 1' },
  { uuid: '2', name: 'Experimento 2' },
];
const onClose = () => {
  setVisible(false);
};
const onConfirm = () => {
  alert('onConfirm');
};

<div>
  <button onClick={() => setVisible(true)}>Open modal</button>
  <PrepareDeploymentsModal
    visible={visible}
    loading={loading}
    experiments={experiments}
    onClose={onClose}
    onConfirm={onConfirm}
  />
</div>;
```
