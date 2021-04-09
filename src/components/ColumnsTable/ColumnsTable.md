**Default**

```js
import { MemoryRouter } from 'react-router-dom';

<MemoryRouter>
  <ColumnsTable
    columns={[
      { uuid: '1', name: 'Name 1', featuretype: 'Numerical' },
      { uuid: '2', name: 'Name 2', featuretype: 'DateTime' },
      { uuid: '3', name: 'Name 3', featuretype: 'Categorical' },
    ]}
    selectedRows={['1']}
    currentPage={1}
    setCurrentPage={() => alert('Current Page Defined')}
    handleChangeType={() => alert('Type Changed')}
    handleRowSelection={() => alert('Row Selected')}
  />
</MemoryRouter>;
```

**Loading**

```js
import { MemoryRouter } from 'react-router-dom';

<MemoryRouter>
  <ColumnsTable
    columns={[
      { uuid: '1', name: 'Name 1', featuretype: 'Numerical' },
      { uuid: '2', name: 'Name 2', featuretype: 'DateTime' },
      { uuid: '3', name: 'Name 3', featuretype: 'Categorical' },
    ]}
    selectedRows={['1']}
    currentPage={1}
    setCurrentPage={() => alert('Current Page Defined')}
    handleChangeType={() => alert('Type Changed')}
    handleRowSelection={() => alert('Row Selected')}
    loading
  />
</MemoryRouter>;
```

**Disabled**

```js
import { MemoryRouter } from 'react-router-dom';

<MemoryRouter>
  <ColumnsTable
    columns={[
      { uuid: '1', name: 'Name 1', featuretype: 'Numerical' },
      { uuid: '2', name: 'Name 2', featuretype: 'DateTime' },
      { uuid: '3', name: 'Name 3', featuretype: 'Categorical' },
    ]}
    selectedRows={['1']}
    currentPage={1}
    setCurrentPage={() => alert('Current Page Defined')}
    handleChangeType={() => alert('Type Changed')}
    handleRowSelection={() => alert('Row Selected')}
    disabled
  />
</MemoryRouter>;
```
