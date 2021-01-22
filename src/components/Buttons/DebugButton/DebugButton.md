**Default**
```js
const onClick = () => {
  alert('Debug!');
};

const disabled = false;

const active = true;

<DebugButton active={active} onClick={onClick} />;
```

**Selected**
```js
const onClick = () => {
  alert('Debug!');
};

const disabled = false;

const active = false;

<DebugButton active={active} onClick={onClick} />;
```

**Disabled**
```js
const onClick = () => {
  alert('Debug!');
};

const disabled = true;

const active = true;

<DebugButton disabled={disabled} active={active} onClick={onClick} />;
```