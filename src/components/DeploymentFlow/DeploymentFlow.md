**Padrão:**

Renderização sem nenhuma tarefa.

```js
import { DatabaseOutlined } from '@ant-design/icons';
const icon = <DatabaseOutlined />;

const tarefas = [
  {
    uuid: '1',
    dependencies: [],
    name: 'Tarefa 1',
    positionX: 0,
    positionY: 0,
    icon: icon,
  },
  {
    uuid: '2',
    dependencies: ['1'],
    name: 'Tarefa 2',
    positionX: 350,
    positionY: 50,
    icon: icon,
  },
];

<div style={{ width: '100%', height: '350px' }}>
  <DeploymentFlow operators={tarefas} />
</div>;
```

Renderização com loading.

```js
<div style={{ width: '100%', height: '350px' }}>
  <DeploymentFlow loading={true} operators={[]} />
</div>
```
