**Default**

```js
const [isShowing, setIsShowing] = React.useState(false);
const handleShowModal = () => setIsShowing(true);
const handleHideModal = () => setIsShowing(false);

<>
  <button type='button' onClick={handleShowModal}>
    Show Modal
  </button>

  <NotebooksExplanationModal
    isShowing={isShowing}
    handleHideModal={handleHideModal}
  />
</>;
```
