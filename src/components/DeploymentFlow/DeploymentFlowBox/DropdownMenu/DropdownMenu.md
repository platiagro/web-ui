**Default**
```js
const onEdit = () => alert('Edit!');

const onRemove = () => alert('Remove!');

<DropdownMenu onEdit={onEdit} onRemove={onRemove} >
  <div>Right click here!</div>
</DropdownMenu>
```


**Disabled**
```js
const disabled = true;

const onEdit = () => alert('Edit!');

const onRemove = () => alert('Remove!');

<DropdownMenu disabled={disabled} onEdit={onEdit} onRemove={onRemove} >
  <div>Right click here!</div>
</DropdownMenu>
```