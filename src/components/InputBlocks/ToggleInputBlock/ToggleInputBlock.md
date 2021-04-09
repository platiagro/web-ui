**Default**

```js
const [isChecked, setIsChecked] = React.useState(false);

<ToggleInputBlock
  handleChange={(inputName, isCheckedNow) => {
    console.log(inputName);
    setIsChecked(isCheckedNow);
  }}
  valueLatestTraining={isChecked}
  isChecked={isChecked}
  name='Name'
  title='The Title'
  tip='The Tip'
/>;
```

**Disabled**

```js
const [isChecked, setIsChecked] = React.useState(false);

<ToggleInputBlock
  handleChange={(inputName, isCheckedNow) => {
    console.log(inputName);
    setIsChecked(isCheckedNow);
  }}
  valueLatestTraining={isChecked}
  isChecked={isChecked}
  name='Name'
  title='The Title'
  tip='The Tip'
  isDisabled
/>;
```

**Loading**

```js
const [isChecked, setIsChecked] = React.useState(false);

<ToggleInputBlock
  handleChange={(inputName, isCheckedNow) => {
    console.log(inputName);
    setIsChecked(isCheckedNow);
  }}
  valueLatestTraining={isChecked}
  isChecked={isChecked}
  name='Name'
  title='The Title'
  tip='The Tip'
  isLoading
/>;
```
