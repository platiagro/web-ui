**Default**

```jsx
const onClick = () => alert('Experimento implantado.');
const disabled = false;

<RunDeploymentButton onClick={onClick} disabled={disabled} />;
```

Desabilitado:

```jsx
const onClick = () => alert('Experimento implantado.');
const disabled = true;

<RunDeploymentButton onClick={onClick} disabled={disabled} />;
```
