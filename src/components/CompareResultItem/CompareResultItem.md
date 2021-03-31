**Default**

```js
<CompareResultItem
  compareResult={{
    experimentId: '1',
    operatorId: '2',
    runId: '3',
    metrics: 'metrics',
    metrics: {},
    results: {},
  }}
  experiments={[]}
  experimentsOptions={[]}
  experimentsTrainingHistory={[]}
  onDelete={(id) => alert(`Delete with ID ${id || ''}`)}
  onFetchResults={() => alert('Fetch Results')}
  onResultDatasetPageChange={() => alert('Result Dataset Changed')}
  onLoadTrainingHistory={() => alert('Load Training History')}
  onUpdate={() => alert('Handle Update')}
  tasks={[]}
/>
```
