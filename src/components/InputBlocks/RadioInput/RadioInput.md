**Default**

```js
<RadioInput
  handleChange={(value) => alert(`Value Selected = ${value}`)}
  name='Name'
  tip='Choose an Option'
  title='Raio Title'
  value='1'
  valueLatestTraining='1'
  options={[
    { uuid: '1', name: 'Option 1' },
    { uuid: '2', name: 'Option 2' },
    { uuid: '3', name: 'Option 3' },
    { uuid: '4', name: 'Option 4' },
  ]}
/>
```

**Loading**

```js
<RadioInput
  handleChange={(value) => alert(`Value Selected = ${value}`)}
  name='Name'
  tip='Choose an Option'
  title='Raio Title'
  value='1'
  valueLatestTraining='1'
  options={[
    { uuid: '1', name: 'Option 1' },
    { uuid: '2', name: 'Option 2' },
    { uuid: '3', name: 'Option 3' },
    { uuid: '4', name: 'Option 4' },
  ]}
  isLoading
/>
```

**Disabled**

```js
<RadioInput
  handleChange={(value) => alert(`Value Selected = ${value}`)}
  name='Name'
  tip='Choose an Option'
  title='Raio Title'
  value='1'
  valueLatestTraining='1'
  options={[
    { uuid: '1', name: 'Option 1' },
    { uuid: '2', name: 'Option 2' },
    { uuid: '3', name: 'Option 3' },
    { uuid: '4', name: 'Option 4' },
  ]}
  isDisabled
/>
```
