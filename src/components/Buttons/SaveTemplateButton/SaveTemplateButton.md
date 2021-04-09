```js
const onClick = () => {
  alert('Novo template!');
};

const disabled = false;

<SaveTemplateButton disabled={disabled} onClick={onClick} />;
```

Botão desabilitado.

```js
const onClick = () => {
  alert('Novo template!');
};

const disabled = true;

<SaveTemplateButton disabled={disabled} onClick={onClick} />;
```
