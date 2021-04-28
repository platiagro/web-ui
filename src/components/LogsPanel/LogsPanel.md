**Default**

```js
import { LOG_TYPES } from 'configs';

<LogsPanel
  handleHideLogsPanel={() => alert('Close This Panel')}
  handleOpenLogsModal={() => alert('Open The Logs Modal')}
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
/>;
```

**Loading**

```js
<LogsPanel
  handleHideLogsPanel={() => alert('Close This Panel')}
  handleOpenLogsModal={() => alert('Open The Logs Modal')}
  isLoading
/>
```
