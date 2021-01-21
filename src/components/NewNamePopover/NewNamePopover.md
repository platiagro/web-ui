**Default**
```js

const handleRename = (newName) => alert(`New name: ${newName}`);

const isDuplicate = false;

<NewNamePopover isDuplicate={isDuplicate} onRename={handleRename}>
  <button>Click to show!</button>
</NewNamePopover>
```

**Duplicate**
```js

const handleRename = (newName) => alert(`New name: ${newName}`);

const isDuplicate = true;

<NewNamePopover isDuplicate={isDuplicate} onRename={handleRename}>
  <button>Click to show!</button>
</NewNamePopover>
```

**Current Name**
```js
const currentName = 'My current name!';

const handleRename = (newName) => alert(`New name: ${newName}`);

const isDuplicate = false;

<NewNamePopover isDuplicate={isDuplicate} currentName={currentName} onRename={handleRename}>
  <button>Click to show!</button>
</NewNamePopover>
```

**Loading**
```js
const loading = true;

const handleRename = (newName) => alert(`New name: ${newName}`);

const isDuplicate = false;

<NewNamePopover isDuplicate={isDuplicate} loading={loading} onRename={handleRename}>
  <button>Click to show!</button>
</NewNamePopover>
```