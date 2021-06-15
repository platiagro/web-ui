**Exemplo:**

```js
const [visible, setVisible] = React.useState(false);
const loading = false;

const handleClose = () => {
  setVisible(false);
};

const handleConfirm = () => {
  alert('Confirmed');
};

<div>
  <button onClick={() => setVisible(true)}>Open modal</button>

  <PromoteDeploymentModal
    urlPrefix='teste'
    urlSuffix='teste6'
    visible={visible}
    loading={loading}
    onClose={handleClose}
    onConfirm={handleConfirm}
  />
</div>;
```
