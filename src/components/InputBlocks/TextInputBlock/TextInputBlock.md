**Default**

```js
const [value, setValue] = React.useState('');

<TextInputBlock
  valueLatestTraining={value}
  handleChange={setValue}
  value={value}
  tip='Description'
  name='Name'
  placeholder='Placeholder'
  title='The Title'
/>;
```

**Disabled**

```js
const [value, setValue] = React.useState('');

<TextInputBlock
  valueLatestTraining={value}
  handleChange={setValue}
  value={value}
  tip='Description'
  name='Name'
  placeholder='Placeholder'
  title='The Title'
  isDisabled
/>;
```

**Loading**

```js
const [value, setValue] = React.useState('');

<TextInputBlock
  valueLatestTraining={value}
  handleChange={setValue}
  value={value}
  tip='Description'
  name='Name'
  placeholder='Placeholder'
  title='The Title'
  isLoading
/>;
```
