**Default**

```js
import moment from "moment";


const title = "Filtro de atributos - "

const dateTime = moment(moment().toDate()).format("h:mm:ss, DD/MM/YYYY ");

const message = "Hello World!";

<DebugRow title={title} dateTime={dateTime} message={message} />
```