**Default**

```js

import moment from "moment";

const title = "Filtro de atributos - "

const dateTime = moment(moment().toDate()).format("h:mm:ss, DD/MM/YYYY ");

const message = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.";

<ErrorRow title={title} dateTime={dateTime} message={message} />
```