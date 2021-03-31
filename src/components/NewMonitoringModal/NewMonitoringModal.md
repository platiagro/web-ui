**Default**

```js
let [isShowing, setIsShowing] = React.useState(false);
const handleShowModal = () => setIsShowing(true);
const handleHideModal = () => setIsShowing(false);

const handleAddMonitorings = (selectedTasks) => {
  alert(`Add ${selectedTasks.length} Monitorings`);
};

<>
  <button type='button' onClick={handleShowModal}>
    Click to Show
  </button>

  <NewMonitoringModal
    isShowing={isShowing}
    handleHideModal={handleHideModal}
    handleAddMonitorings={handleAddMonitorings}
    tasks={[
      { uuid: '1', name: 'First Task', description: 'First Description' },
      { uuid: '2', name: 'Second Task', description: 'Second Description' },
      { uuid: '3', name: 'Third Task', description: 'Third Description' },
      { uuid: '4', name: 'Fourth Task', description: 'Fourth Description' },
    ]}
  />
</>;
```

**Loading Tasks**

```js
let [isShowing, setIsShowing] = React.useState(false);
const handleShowModal = () => setIsShowing(true);
const handleHideModal = () => setIsShowing(false);

<>
  <button type='button' onClick={handleShowModal}>
    Click to Show
  </button>

  <NewMonitoringModal
    isShowing={isShowing}
    handleHideModal={handleHideModal}
    isLoadingTasks
  />
</>;
```

**Creating Monitorings**

```js
let [isShowing, setIsShowing] = React.useState(false);
const handleShowModal = () => setIsShowing(true);
const handleHideModal = () => setIsShowing(false);

<>
  <button type='button' onClick={handleShowModal}>
    Click to Show
  </button>

  <NewMonitoringModal
    isShowing={isShowing}
    handleHideModal={handleHideModal}
    tasks={[
      { uuid: '1', name: 'First Task', description: 'First Description' },
      { uuid: '2', name: 'Second Task', description: 'Second Description' },
      { uuid: '3', name: 'Third Task', description: 'Third Description' },
      { uuid: '4', name: 'Fourth Task', description: 'Fourth Description' },
    ]}
    isCreatingMonitorings
  />
</>;
```
