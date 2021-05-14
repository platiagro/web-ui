**Default**

```js
<MonitoringDrawerItem
  hasFilters={true}
  figures={[]}
  monitoringName='Monitoring Name'
  handleRemove={() => alert('Remove This Card')}
  handleDownload={() => alert('Download Figures')}
/>
```

**No Filters**

```js
<MonitoringDrawerItem
  hasFilters={false}
  figures={[]}
  monitoringName='Monitoring Name'
  handleRemove={() => alert('Remove This Card')}
  handleDownload={() => alert('Download Figures')}
/>
```
