**Default**

```js
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from 'store';

<Provider store={Store}>
  <MemoryRouter>
    <Title title='The Title' level={1} handleSubmit={() => alert('Submit')} />
  </MemoryRouter>
</Provider>;
```

**Loading**

```js
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from 'store';

<Provider store={Store}>
  <MemoryRouter>
    <Title
      title='The Title'
      level={1}
      handleSubmit={() => alert('Submit')}
      loading
    />
  </MemoryRouter>
</Provider>;
```
