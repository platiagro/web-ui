**Default**

```js
const [isVisible, setIsVisible] = React.useState(false);
const handleClose = () => setIsVisible(false);
const handleOpen = () => setIsVisible(true);

<>
  <button type='button' onClick={handleOpen}>
    Open Modal
  </button>

  <UsingDeploymentsModal
    title='The Title'
    visible={isVisible}
    handleCloseModal={handleClose}
  >
    <div>Modal Content</div>
  </UsingDeploymentsModal>
</>;
```
