**Default**

```js
import moment from 'moment';

const title = 'Filtro de atributos - ';
const dateTime = moment(moment().toDate()).format('h:mm:ss, DD/MM/YYYY ');
const message =
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

<InfoRow title={title} dateTime={dateTime} message={message} />;
```
