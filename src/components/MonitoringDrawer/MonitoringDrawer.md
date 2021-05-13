**Empty (No Monitoring)**

```js
const [isShowingDrawer, setIsShowingDrawer] = React.useState(false);
const handleShowDrawer = () => setIsShowingDrawer(true);
const handleHideDrawer = () => setIsShowingDrawer(false);

<>
  <button type='button' onClick={handleShowDrawer}>
    Open Drawer
  </button>

  <MonitoringDrawer
    isShowing={isShowingDrawer}
    isAdding={false}
    isLoading={false}
    figures={{}}
    monitorings={[]}
    deploymentName={'Deployment Name'}
    handleHideDrawer={handleHideDrawer}
    handleUpdateLayout={() => alert('handleUpdateLayout')}
    handleAddMonitoring={() => alert('handleAddMonitoring')}
    handleDownloadAllFigures={() => alert('handleDownloadAllFigures')}
  />
</>;
```

**Loading**

```js
const [isShowingDrawer, setIsShowingDrawer] = React.useState(false);
const handleShowDrawer = () => setIsShowingDrawer(true);
const handleHideDrawer = () => setIsShowingDrawer(false);

<>
  <button type='button' onClick={handleShowDrawer}>
    Open Drawer
  </button>

  <MonitoringDrawer
    isShowing={isShowingDrawer}
    isAdding={false}
    isLoading={true}
    figures={{}}
    monitorings={[]}
    deploymentName={'Deployment Name'}
    handleHideDrawer={handleHideDrawer}
    handleUpdateLayout={() => alert('handleUpdateLayout')}
    handleAddMonitoring={() => alert('handleAddMonitoring')}
    handleDownloadAllFigures={() => alert('handleDownloadAllFigures')}
  />
</>;
```

**Adding a Monitoring**

```js
const [isShowingDrawer, setIsShowingDrawer] = React.useState(false);
const handleShowDrawer = () => setIsShowingDrawer(true);
const handleHideDrawer = () => setIsShowingDrawer(false);

<>
  <button type='button' onClick={handleShowDrawer}>
    Open Drawer
  </button>

  <MonitoringDrawer
    isShowing={isShowingDrawer}
    isAdding={true}
    isLoading={false}
    figures={{}}
    monitorings={[]}
    deploymentName={'Deployment Name'}
    handleHideDrawer={handleHideDrawer}
    handleUpdateLayout={() => alert('handleUpdateLayout')}
    handleAddMonitoring={() => alert('handleAddMonitoring')}
    handleDownloadAllFigures={() => alert('handleDownloadAllFigures')}
  />
</>;
```

**With a Monitoring**

```js
const [isShowingDrawer, setIsShowingDrawer] = React.useState(false);
const handleShowDrawer = () => setIsShowingDrawer(true);
const handleHideDrawer = () => setIsShowingDrawer(false);

<>
  <button type='button' onClick={handleShowDrawer}>
    Open Drawer
  </button>

  <MonitoringDrawer
    isShowing={isShowingDrawer}
    isAdding={true}
    isLoading={false}
    figures={{}}
    monitorings={[{ uuid: '1', task: { name: 'Task Name' } }]}
    deploymentName={'Deployment Name'}
    handleHideDrawer={handleHideDrawer}
    handleUpdateLayout={() => alert('handleUpdateLayout')}
    handleAddMonitoring={() => alert('handleAddMonitoring')}
    handleDownloadAllFigures={() => alert('handleDownloadAllFigures')}
  />
</>;
```
