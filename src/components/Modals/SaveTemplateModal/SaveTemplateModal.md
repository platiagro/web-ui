**Exemplo:**

```js
const [visible, setVisible] = React.useState(false);
const loading = false;

const handleClose = () => {
  setVisible(false);
};

const handleConfirm = () => {
  alert('onConfirm');
};

<div>
  <button onClick={() => setVisible(true)}>Open modal</button>

  <SaveTemplateModal
    loading={loading}
    visible={visible}
    onClose={handleClose}
    onConfirm={handleConfirm}
  />
</div>;
```
