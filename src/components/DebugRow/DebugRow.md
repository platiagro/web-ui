**Default**

```js
import moment from 'moment';

const title = 'Filtro de atributos - ';
const message = 'Hello World!';
const dateTime = moment(moment().toDate()).format('h:mm:ss, DD/MM/YYYY ');

<DebugRow title={title} message={message} dateTime={dateTime} />;
```
