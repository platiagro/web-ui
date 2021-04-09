**Default**

This component wraps the uiComponents/Table that also wraps the antd Table component.

The examples below use the most common props that you probably will use. To see the rest of props [click here](https://ant.design/components/table/) see the antd official documentation.

```js
<CommonTable
  columns={[
    {
      key: '1',
      title: 'User Name',
      dataIndex: 'name',
      render: (val) => <span style={{ color: 'red' }}>{val}</span>,
    },
    {
      key: '2',
      title: 'User Age',
      dataIndex: 'age',
      render: (val) => <span style={{ color: 'blue' }}>{val}</span>,
    },
  ]}
  dataSource={[
    { key: '1', name: 'Name 1', age: '1' },
    { key: '2', name: 'Name 2', age: '2' },
    { key: '3', name: 'Name 3', age: '3' },
    { key: '4', name: 'Name 4', age: '4' },
    { key: '5', name: 'Name 5', age: '5' },
    { key: '6', name: 'Name 6', age: '6' },
  ]}
  rowKey={`${Math.random()}`} // This can also be a function
  isLoading={false}
/>
```

**Loading and With Border**

```js
<CommonTable
  bordered
  columns={[
    {
      key: '1',
      title: 'User Name',
      dataIndex: 'name',
      render: (val) => <span style={{ color: 'red' }}>{val}</span>,
    },
    {
      key: '2',
      title: 'User Age',
      dataIndex: 'age',
      render: (val) => <span style={{ color: 'blue' }}>{val}</span>,
    },
  ]}
  dataSource={[]}
  rowKey={`${Math.random()}`} // This can also be a function
  isLoading
/>
```
