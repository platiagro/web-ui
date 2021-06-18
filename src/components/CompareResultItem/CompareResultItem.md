**Default**

```js
<CompareResultItem
  compareResult={{
    experimentId: '1',
    operatorId: '2',
    runId: '3',
    results: {},
  }}
  tasks={[]}
  experiments={[]}
  experimentsOptions={[]}
  experimentsTrainingHistory={[]}
  onUpdate={() => alert('Handle Update')}
  onFetchResults={() => alert('Fetch Results')}
  onDelete={(id) => alert(`Delete with ID ${id || ''}`)}
  onLoadTrainingHistory={() => alert('Load Training History')}
  onResultDatasetPageChange={() => alert('Result Dataset Changed')}
/>
```
