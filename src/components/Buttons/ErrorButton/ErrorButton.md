**Default**
```js
const onClick = () => {
  alert('Error!');
};

const disabled = false;

const active = false;

<ErrorButton active={active} disabled={disabled} onClick={onClick} />;
```

**Selected**
```js
const onClick = () => {
  alert('Error!');
};

const disabled = false;

const active = true;

<ErrorButton active={active} disabled={disabled} onClick={onClick} />;
```

**Disabled**
```js
const onClick = () => {
  alert('Error!');
};

const disabled = true;

<ErrorButton disabled={disabled} onClick={onClick} />;
```