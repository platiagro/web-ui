**Default**

```js
const [visible, setVisible] = React.useState(false);

const experiments = [
  { uuid: '1', name: 'Experimento 1' },
  { uuid: '2', name: 'Experimento 2' },
];

const handleClose = () => {
  setVisible(false);
};

const handleConfirm = () => {
  alert('onConfirm');
};

<>
  <button onClick={() => setVisible(true)}>Open modal</button>

  <PrepareDeploymentsModal
    visible={visible}
    onClose={handleClose}
    onConfirm={handleConfirm}
    experiments={experiments}
  />
</>;
```
