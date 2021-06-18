**Default**

```js
import { MemoryRouter } from 'react-router-dom';

<MemoryRouter>
  <DatasetColumnsTable
    selectedRows={['1']}
    setParameterLoading={false}
    handleSetColumnType={() => alert('Set Column Type')}
    handleRowSelection={() => alert('Row Selected')}
    columns={[
      {
        key: '1',
        name: 'Name 1',
        featuretype: 'Feature Type 1',
      },
      {
        key: '2',
        name: 'Name 2',
        featuretype: 'Feature Type 2',
      },
      {
        key: '3',
        name: 'Name 3',
        featuretype: 'Feature Type 3',
      },
    ]}
  />
</MemoryRouter>;
```

**No Data to Show**

```js
import { MemoryRouter } from 'react-router-dom';

<MemoryRouter>
  <DatasetColumnsTable
    columns={[]}
    selectedRows={['1']}
    handleSetColumnType={() => alert('Set Column Type')}
    handleRowSelection={() => alert('Row Selected')}
  />
</MemoryRouter>;
```

**Loading**

```js
import { MemoryRouter } from 'react-router-dom';

<MemoryRouter>
  <DatasetColumnsTable
    selectedRows={['1']}
    setParameterLoading={true}
    handleSetColumnType={() => alert('Set Column Type')}
    handleRowSelection={() => alert('Row Selected')}
    columns={[
      {
        key: '1',
        name: 'Name 1',
        featuretype: 'Feature Type 1',
      },
    ]}
  />
</MemoryRouter>;
```
