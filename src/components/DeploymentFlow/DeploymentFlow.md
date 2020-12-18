**Padrão:**

Renderização sem nenhuma tarefa.

```js
const tarefas = [
  {
    uuid: "1",
    dependencies: [],
    name: "Tarefa 1",
    positionX: 0,
    positionY: 0,
  },
];

<div style={{ width: "100%", height: "350px" }}>
  <DeploymentFlow operators={tarefas} />
</div>;
```

Renderização com loading.

```js
<div style={{ width: "100%", height: "350px" }}>
  <DeploymentFlow loading={true} operators={[]} />
</div>
```
