**Default**

```js
const [isShowingModal, setIsShowingModal] = React.useState(false);
const handleShowModal = () => setIsShowingModal(true);
const handleHideModal = () => setIsShowingModal(false);

<>
  <button type='button' onClick={handleShowModal}>
    Show Modal
  </button>

  <NotebooksExplanationModal
    isShowingModal={isShowingModal}
    handleHideModal={handleHideModal}
  />
</>;
```
