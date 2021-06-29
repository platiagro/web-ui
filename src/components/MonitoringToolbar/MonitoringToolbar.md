**Default**

```js
<MonitoringToolbar handleAddMonitoring={() => alert('Add A New Monitoring')} />
```

**With See Monitoring Button**

```js
<MonitoringToolbar
  handleSeeMonitoring={() => alert('See the Monitoring')}
  showSeeButton
/>
```

**With Delete Monitoring Button**

```js
<MonitoringToolbar
  handleDeleteMonitoring={() => alert('Delete Monitoring')}
  showDeleteButton
/>
```
