**Default**
```js

const handleRename = (newName) => alert(`New name: ${newName}`);

<NewNamePopover onRename={handleRename}>
  <button>Click to show!</button>
</NewNamePopover>
```

**Current Name**
```js
const currentName = 'My current name!';

const handleRename = (newName) => alert(`New name: ${newName}`);

<NewNamePopover currentName={currentName} onRename={handleRename}>
  <button>Click to show!</button>
</NewNamePopover>
```

**Loading**
```js
const loading = true;

const handleRename = (newName) => alert(`New name: ${newName}`);

<NewNamePopover loading={loading} onRename={handleRename}>
  <button>Click to show!</button>
</NewNamePopover>
```