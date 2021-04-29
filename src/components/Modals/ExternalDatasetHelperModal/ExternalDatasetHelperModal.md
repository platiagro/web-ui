**Default**

```js
const [visible, setVisible] = React.useState(false);

const onClose = () => {
  setVisible(false);
};

const url = 'https://ip.to.copy/prediction';

<div>
  <button onClick={() => setVisible(true)}>Open modal</button>
  <ExternalDatasetHelperModal onClose={onClose} visible={visible} url={url} />
</div>;
```

**Change example body**

```js
import { Input } from 'antd';
const [visible, setVisible] = React.useState(false);
const [exampleBody, setExampleBody] = React.useState(`{
  	"meta":{
  		"puid": "pqvaab0ej28n89sr4ffjni1ie7",
  		"tags":{},
  		"routing":{},
  		"requestPath":{
  			"e65e85-a056-40b7-9e4b-4db49ee3b915": "platiagro/platiagro-deployment-image:0.1.0"
  		},
  		"metrics":[]
  	}
  }`);

const onClose = () => {
  setVisible(false);
};

const handleChangeExample = (e) => {
  setExampleBody(e.target.value);
};

const url = 'https://ip.to.copy/prediction';

<div>
  <Input.TextArea
    size='large'
    value={exampleBody}
    onChange={handleChangeExample}
    rows={12}
  />
  <button onClick={() => setVisible(true)}>Open modal</button>
  <ExternalDatasetHelperModal
    exampleBody={exampleBody}
    onClose={onClose}
    visible={visible}
    url={url}
  />
</div>;
```
