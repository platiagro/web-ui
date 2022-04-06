**Default**

```js
const [visible, setVisible] = React.useState(false);

const handleClose = () => {
  setVisible(false);
};

const url = 'https://ip.to.copy/prediction';

<div>
  <button onClick={() => setVisible(true)}>Open modal</button>
  <ExternalDatasetHelperModal
    url={url}
    visible={visible}
    onClose={handleClose}
  />
</div>;
```

**Change example body**

```js
import { Input } from 'antd';

const [visible, setVisible] = React.useState(false);
const [exampleBody, setExampleBody] = React.useState(`{
  	"meta":{}
  }`);

const handleClose = () => {
  setVisible(false);
};

const handleChangeExample = (e) => {
  setExampleBody(e.target.value);
};

const url = 'https://ip.to.copy/prediction';

<div>
  <Input.TextArea
    rows={12}
    size='large'
    value={exampleBody}
    onChange={handleChangeExample}
  />

  <button onClick={() => setVisible(true)}>Open modal</button>

  <ExternalDatasetHelperModal
    url={url}
    visible={visible}
    onClose={handleClose}
    exampleBody={exampleBody}
  />
</div>;
```
