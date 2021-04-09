**Default**

```js
const [isVisible, setIsVisible] = React.useState(false);
const handleClose = () => setIsVisible(false);
const handleOpen = () => setIsVisible(true);

<>
  <button type='button' onClick={handleOpen}>
    Open Drawer
  </button>

  <LogsDrawer
    title='The Title'
    handleClose={handleClose}
    isVisible={isVisible}
    logs={[
      {
        containerName: 'Container 1',
        logs: [
          {
            timestamp: '',
            level: 'Level 1',
            message: 'Message 1',
          },
          {
            timestamp: '',
            level: 'Level 2',
            message: 'Message 2',
          },
          {
            timestamp: '',
            level: 'Level 3',
            message: 'Message 3',
          },
        ],
      },
    ]}
  />
</>;
```

**Loading**

```js
const [isVisible, setIsVisible] = React.useState(false);
const handleClose = () => setIsVisible(false);
const handleOpen = () => setIsVisible(true);

<>
  <button type='button' onClick={handleOpen}>
    Open Drawer
  </button>

  <LogsDrawer
    title='The Title'
    handleClose={handleClose}
    isVisible={isVisible}
    logs={[]}
    isLoading
  />
</>;
```
