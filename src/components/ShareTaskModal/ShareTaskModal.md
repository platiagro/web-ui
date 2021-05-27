**Default**

```js
const [isShowing, setIsShowing] = React.useState(false);
const handleShowModal = () => setIsShowing(true);
const handleHideModal = () => setIsShowing(false);

const handleSendTaskCopyToEmail = (email) => {
  alert(`Send Task Copy To: ${email}`);
};

<>
  <button type='button' onClick={handleShowModal}>
    Show Modal
  </button>

  <ShareTaskModal
    isShowing={isShowing}
    handleHideModal={handleHideModal}
    handleSendTaskCopyToEmail={handleSendTaskCopyToEmail}
  />
</>;
```
