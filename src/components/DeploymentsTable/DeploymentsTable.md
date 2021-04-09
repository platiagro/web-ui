**Default**

```js
import { MemoryRouter } from 'react-router-dom';

<MemoryRouter>
  <DeploymentsTable
    deployments={[
      {
        uuid: '1',
        name: 'Deployment 1',
        status: 'Running',
        url: 'www.google.com',
        createdAt: '2020-05-03',
        action: '',
      },
      {
        uuid: '2',
        name: 'Deployment 2',
        status: 'Succeeded',
        url: 'www.google.com',
        createdAt: '2020-05-03',
        action: '',
      },
      {
        uuid: '3',
        name: 'Deployment 3',
        status: 'Failed',
        url: 'www.google.com',
        createdAt: '2020-05-03',
        action: '',
      },
    ]}
    onDeleteDeployment={() => alert('Deployment Deleted')}
    onOpenLog={() => alert('Log Opened')}
    onTestInference={() => alert('Inference Tested')}
    loading={false}
  />
</MemoryRouter>;
```

**Loading**

```js
import { MemoryRouter } from 'react-router-dom';

<MemoryRouter>
  <DeploymentsTable
    deployments={[
      {
        uuid: '1',
        name: 'Deployment 1',
        status: 'Running',
        url: 'www.google.com',
        createdAt: '2020-05-03',
        action: '',
      },
      {
        uuid: '2',
        name: 'Deployment 2',
        status: 'Succeeded',
        url: 'www.google.com',
        createdAt: '2020-05-03',
        action: '',
      },
      {
        uuid: '3',
        name: 'Deployment 3',
        status: 'Failed',
        url: 'www.google.com',
        createdAt: '2020-05-03',
        action: '',
      },
    ]}
    onDeleteDeployment={() => alert('Deployment Deleted')}
    onOpenLog={() => alert('Log Opened')}
    onTestInference={() => alert('Inference Tested')}
    loading
  />
</MemoryRouter>;
```
