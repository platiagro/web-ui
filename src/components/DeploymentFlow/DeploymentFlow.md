**Default**

```js
import { DatabaseOutlined } from '@ant-design/icons';

const tasks = [
  {
    uuid: '1',
    dependencies: [],
    name: 'Task 1',
    positionX: 0,
    positionY: 0,
    icon: <DatabaseOutlined />,
  },
  {
    uuid: '2',
    dependencies: ['1'],
    name: 'Task 2',
    positionX: 350,
    positionY: 50,
    icon: <DatabaseOutlined />,
  },
];

const handleClick = (e) => {
  alert('Clicked in ' + e.name);
};

<div style={{ width: '100%', height: '350px' }}>
  <DeploymentFlow onClickCard={handleClick} operators={tasks} />
</div>;
```

**Loading**

```js
<div style={{ width: '100%', height: '350px' }}>
  <DeploymentFlow loading={true} operators={[]} />
</div>
```
