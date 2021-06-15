**Default**

```js
const handleSelectMonitoring = (monitoring) => {
  alert(`${monitoring.title} Monitoring Clicked`);
};

<MonitoringPanel
  handleSelectMonitoring={handleSelectMonitoring}
  monitorings={[
    { uuid: '1', title: 'First' },
    { uuid: '2', title: 'Second' },
    { uuid: '3', title: 'Third' },
  ]}
/>;
```

**Loading Monitorings**

```js
<MonitoringPanel isLoading />
```

**Deleting a Monitoring**

```js
<MonitoringPanel
  selectedMonitoring={{ uuid: '2', title: 'Second' }}
  monitorings={[
    { uuid: '1', title: 'First' },
    { uuid: '2', title: 'Second' },
    { uuid: '3', title: 'Third' },
  ]}
  isDeleting
/>
```
