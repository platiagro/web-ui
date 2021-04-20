**Default**

```js
import { LOG_TYPES } from 'configs';

let [isShowing, setIsShowing] = React.useState(false);
const handleShowModal = () => setIsShowing(true);
const handleHideModal = () => setIsShowing(false);

<>
  <button type='button' onClick={handleShowModal}>
    Click to Show
  </button>

  <LogsModal
    isShowing={isShowing}
    handleHideModal={handleHideModal}
    logs={[
      {
        uuid: '1',
        type: LOG_TYPES.ERROR,
        title: 'The Title 1',
        message: 'The Message 1',
      },
      {
        uuid: '2',
        type: LOG_TYPES.INFO,
        title: 'The Title 2',
        message: 'The Message 2',
      },
      {
        uuid: '3',
        type: LOG_TYPES.DEBUG,
        title: 'The Title 3',
        message: 'The Message 3',
      },
    ]}
  />
</>;
```
