```js
const onClick = () => {
  alert('Preparar para a implantação!');
};

const disabled = false;

<PrepareDeploymentsButton disabled={disabled} onClick={onClick} />;
```

Botão carregando.

```js
const loading = true;

<PrepareDeploymentsButton loading={loading} onClick={onClick} />;
```

Botão desabilitado.

```js
const onClick = () => {
  alert('Preparar para a implantação!');
};

const disabled = true;

<PrepareDeploymentsButton disabled={disabled} onClick={onClick} />;
```
