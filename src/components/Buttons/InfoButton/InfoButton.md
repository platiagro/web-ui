**Default**
```js
const onClick = () => {
  alert('Info!');
};

const disabled = false;

const active = false;

<InfoButton  active={active} disabled={disabled} onClick={onClick} />;
```

**Selected**
```js
const onClick = () => {
  alert('Info!');
};

const disabled = false;

const active = true;

<InfoButton active={active} disabled={disabled} onClick={onClick} />;
```

**Disabled**
```js
const onClick = () => {
  alert('Info!');
};

const disabled = true;

<InfoButton disabled={disabled} onClick={onClick} />;
```
