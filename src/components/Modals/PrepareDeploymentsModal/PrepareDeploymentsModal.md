**Exemplo:**

```js
const [visible, setVisible] = React.useState(false);

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

<>
  <button onClick={() => setVisible(true)}>Open modal</button>

  <PrepareDeploymentsModal
    visible={visible}
    onClose={onClose}
    onConfirm={onConfirm}
    experiments={experiments}
  />
</>;
```
