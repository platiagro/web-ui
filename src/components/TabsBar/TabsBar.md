**Exemplo:**

```js
const activeTab = '1';
const deleteTitle = 'Excluir aba?';
const loading = false;
const tabs = [
  {
    uuid: '1',
    name: 'tab 1',
  },
  {
    uuid: '2',
    name: 'tab 2',
  },
];

const onDelete = (id) => {
  console.log(id);
};

const onMoveTab = (dragId, hoverId) => {
  console.log(dragId, hoverId);
};

<TabsBar
  activeTab={activeTab}
  deleteTitle={deleteTitle}
  loading={loading}
  onDelete={onDelete}
  onMoveTab={onMoveTab}
  tabs={tabs}
/>;
```
