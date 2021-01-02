```js
const onClick = () => {
  alert('Comparar resultados!');
};

const disabled = false;

<CompareResultsButton disabled={disabled} onClick={onClick} />;
```

Botão desabilitado.

```js
const onClick = () => {
  alert('Comparar resultados!');
};

const disabled = true;

<CompareResultsButton disabled={disabled} onClick={onClick} />;
```
