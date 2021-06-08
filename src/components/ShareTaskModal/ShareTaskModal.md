**Default**

```js
const [isShowingModal, setIsShowingModal] = React.useState(false);
const handleShowModal = () => setIsShowingModal(true);
const handleHideModal = () => setIsShowingModal(false);

const handleSendTaskCopyToEmail = (email) => {
  alert(`Send Task Copy To: ${email}`);
};

<>
  <button type='button' onClick={handleShowModal}>
    Show Modal
  </button>

  <ShareTaskModal
    isShowingModal={isShowingModal}
    handleHideModal={handleHideModal}
    handleSendTaskCopyToEmail={handleSendTaskCopyToEmail}
  />
</>;
```
