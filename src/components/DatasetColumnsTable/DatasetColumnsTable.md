**Default**

```js
// This import is only to the style guide works
import { MemoryRouter } from 'react-router-dom';

<MemoryRouter>
  <DatasetColumnsTable
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
    handleSetColumnType={() => alert('Set Column Type')}
    handleRowSelection={() => alert('Row Selected')}
    selectedRows={['1']}
    setParameterLoading={false}
  />
</MemoryRouter>;
```

**No Data to Show**

```js
// This import is only to the style guide works
import { MemoryRouter } from 'react-router-dom';

<MemoryRouter>
  <DatasetColumnsTable
    columns={[]}
    handleSetColumnType={() => alert('Set Column Type')}
    handleRowSelection={() => alert('Row Selected')}
    selectedRows={['1']}
  />
</MemoryRouter>;
```

**Loading**

```js
// This import is only to the style guide works
import { MemoryRouter } from 'react-router-dom';

<MemoryRouter>
  <DatasetColumnsTable
    columns={[
      {
        key: '1',
        name: 'Name 1',
        featuretype: 'Feature Type 1',
      },
    ]}
    handleSetColumnType={() => alert('Set Column Type')}
    handleRowSelection={() => alert('Row Selected')}
    selectedRows={['1']}
    setParameterLoading={true}
  />
</MemoryRouter>;
```
