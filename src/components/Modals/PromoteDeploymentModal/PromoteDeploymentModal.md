**Exemplo:**

```js
const [visible, setVisible] = React.useState(false);
const loading = false;
const onClose = () => {
  setVisible(false);
};
const onConfirm = () => {
  alert('onConfirm');
};

<div>
  <button onClick={() => setVisible(true)}>Open modal</button>
  <PromoteDeploymentModal
    visible={visible}
    loading={loading}
    onClose={onClose}
    onConfirm={onConfirm}
  />
</div>;
```