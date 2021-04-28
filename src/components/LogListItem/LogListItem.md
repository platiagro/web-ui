**Info Log**

```js
import { LOG_TYPES } from 'configs';

<LogListItem type={LOG_TYPES.INFO} title='Log Title' text='Log Text' />;
```

**Error Log**

```js
import { LOG_TYPES } from 'configs';

<LogListItem type={LOG_TYPES.ERROR} title='Log Title' text='Log Text' />;
```

**Debug Log**

```js
import { LOG_TYPES } from 'configs';

<LogListItem type={LOG_TYPES.DEBUG} title='Log Title' text='Log Text' />;
```

**Log With No Title**

```js
import { LOG_TYPES } from 'configs';

<LogListItem type={LOG_TYPES.INFO} text='Log Text' />;
```
