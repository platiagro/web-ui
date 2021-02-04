**Default**
```js

const [visible, setVisible] = React.useState(false);

const onClose = () => {
  setVisible(false);
};

const url = `{
	"meta":{
		"puid": "pqvaab0ej28n89sr4ffjni1ie7",
		"tags":{},
		"routing":{},
		"requestPath":{
			"e65e85-a056-40b7-9e4b-4db49ee3b915": "platiagro/platiagro-deployment-image:0.1.0"
		},
		"metrics":[]
	}
}`

const disabled= true;

<div>
  <button onClick={() => setVisible(true)}>Open modal</button>
  <ExternalDatasetHelperModal
    onClose={onClose}
    visible={visible}
	disabled={disabled}
	url={url}
  />
</div>;
```