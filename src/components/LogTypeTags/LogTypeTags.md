**Default**

```js
const [isErrorTagSelected, setIsErrorTagSelected] = React.useState(true);
const [isInfoTagSelected, setIsInfoTagSelected] = React.useState(true);
const [isDebugTagSelected, setIsDebugTagSelected] = React.useState(true);

const handleToggleErrorTag = () => {
  setIsErrorTagSelected((isSelected) => !isSelected);
};

const handleToggleInfoTag = () => {
  setIsInfoTagSelected((isSelected) => !isSelected);
};

const handleToggleDebugTag = () => {
  setIsDebugTagSelected((isSelected) => !isSelected);
};

<LogTypeTags
  isErrorTagSelected={isErrorTagSelected}
  isInfoTagSelected={isInfoTagSelected}
  isDebugTagSelected={isDebugTagSelected}
  handleToggleErrorTag={handleToggleErrorTag}
  handleToggleInfoTag={handleToggleInfoTag}
  handleToggleDebugTag={handleToggleDebugTag}
/>;
```
