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
    handleCloseModal={handleClose}
    visible={isVisible}
    title='The Title'
  >
    <div>Modal Content</div>
  </UsingDeploymentsModal>
</>;
```
