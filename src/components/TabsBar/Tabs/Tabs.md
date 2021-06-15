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

const onChange = (id) => {
  console.log(id);
};

const onDelete = (id) => {
  console.log(id);
};

const onDuplicate = (currentId, name) => {
  console.log(currentId, name);
};

const onMoveTab = (dragId, hoverId) => {
  console.log(dragId, hoverId);
};

const onRename = (currentId, name) => {
  console.log(currentId, name);
};

<Tabs
  activeTab={activeTab}
  deleteTitle={deleteTitle}
  loading={loading}
  onChange={onChange}
  onDelete={onDelete}
  onDuplicate={onDuplicate}
  onMoveTab={onMoveTab}
  onRename={onRename}
  tabs={tabs}
/>;
```
