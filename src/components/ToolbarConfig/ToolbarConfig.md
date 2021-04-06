**Default - Deployment**

```js
import { ReactFlowProvider } from 'react-flow-renderer';

<ReactFlowProvider>
  <ToolbarConfig deployment />
</ReactFlowProvider>;
```

**With Operator and Delete Button**

```js
import { ReactFlowProvider } from 'react-flow-renderer';

<ReactFlowProvider>
  <ToolbarConfig
    handleDeleteClick={() => alert('Deleted')}
    operator={{ uuid: '1' }}
  />
</ReactFlowProvider>;
```
