**Exemplo:**

```js
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
const activeTab = '1';
const deleteTitle = 'Excluir aba?';
const handleChange = (id) => {
  console.log(id);
};
const handleDelete = (id) => {
  console.log(id);
};
const handleDuplicate = (currentId, name) => {
  console.log(currentId, name);
};
const handleMoveTab = (dragId, hoverId) => {
  console.log(dragId, hoverId);
};
const handleRename = (currentId, name) => {
  console.log(currentId, name);
};
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

<DndProvider backend={HTML5Backend}>
  <Tab
    activeTab={activeTab}
    deleteTitle={deleteTitle}
    handleChange={handleChange}
    handleDelete={handleDelete}
    handleDuplicate={handleDuplicate}
    handleMoveTab={handleMoveTab}
    handleRename={handleRename}
    loading={loading}
    tabs={tabs}
  />
</DndProvider>;
```
