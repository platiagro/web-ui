**Exemplo:**

```js
const activeTab = '1';
const deleteTitle = 'Excluir aba?';
const modalItemLabel = 'Qual o nome da sua aba?';
const modalInitialValue = 'Nova aba';
const modalRuleMessage = 'Por favor insira um nome para a aba!';
const modalTitle = 'Nova aba';
const handleDelete = (id) => {
  console.log(id);
};
const handleMoveTab = (dragId, hoverId) => {
  console.log(dragId, hoverId);
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

<Tabs
  activeTab={activeTab}
  deleteTitle={deleteTitle}
  modalItemLabel={modalItemLabel}
  modalInitialValue={modalInitialValue}
  modalRuleMessage={modalRuleMessage}
  modalTitle={modalTitle}
  handleDelete={handleDelete}
  handleMoveTab={handleMoveTab}
  loading={loading}
  tabs={tabs}
/>;
```
