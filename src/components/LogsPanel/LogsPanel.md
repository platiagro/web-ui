**Default**

```js
<LogsPanel
  handleHideLogsPanel={() => alert('Close This Panel')}
  handleOpenLogsModal={() => alert('Open The Logs Modal')}
  logs={[
    { uuid: '1', type: 'ERROR', title: 'Title 1', message: 'Message 1' },
    { uuid: '2', type: 'INFO', title: 'Title 2', message: 'Message 2' },
    { uuid: '3', type: 'DEBUG', title: 'Title 3', message: 'Message 3' },
  ]}
/>
```

**Loading**

```js
<LogsPanel
  handleHideLogsPanel={() => alert('Close This Panel')}
  handleOpenLogsModal={() => alert('Open The Logs Modal')}
  isLoading
/>
```
