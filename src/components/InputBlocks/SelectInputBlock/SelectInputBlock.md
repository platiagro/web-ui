**Default**

```js
const [selectedOption, setSelectedOption] = React.useState(undefined);

<SelectInputBlock
  handleChange={setSelectedOption}
  value={selectedOption}
  valueLatestTraining={selectedOption}
  name='Name'
  placeholder='Selecionar'
  tip='The Tip'
  title='The Title'
  options={[
    { uuid: '1', name: 'Option 1' },
    { uuid: '2', name: 'Option 2' },
    { uuid: '3', name: 'Option 3' },
    { uuid: '4', name: 'Option 4' },
  ]}
/>;
```

**Multiple Selection**

```js
const [selectedOption, setSelectedOption] = React.useState(undefined);

<SelectInputBlock
  handleChange={setSelectedOption}
  value={selectedOption}
  valueLatestTraining={selectedOption}
  name='Name'
  placeholder='Selecionar'
  tip='The Tip'
  title='The Title'
  options={[
    { uuid: '1', name: 'Option 1' },
    { uuid: '2', name: 'Option 2' },
    { uuid: '3', name: 'Option 3' },
    { uuid: '4', name: 'Option 4' },
  ]}
  isMultiple
/>;
```

**Disabled**

```js
const [selectedOption, setSelectedOption] = React.useState(undefined);

<SelectInputBlock
  handleChange={setSelectedOption}
  value={selectedOption}
  valueLatestTraining={selectedOption}
  name='Name'
  placeholder='Selecionar'
  tip='The Tip'
  title='The Title'
  options={[
    { uuid: '1', name: 'Option 1' },
    { uuid: '2', name: 'Option 2' },
    { uuid: '3', name: 'Option 3' },
    { uuid: '4', name: 'Option 4' },
  ]}
  isDisabled
/>;
```

**Loading**

```js
const [selectedOption, setSelectedOption] = React.useState(undefined);

<SelectInputBlock
  handleChange={setSelectedOption}
  value={selectedOption}
  valueLatestTraining={selectedOption}
  name='Name'
  placeholder='Selecionar'
  tip='The Tip'
  title='The Title'
  options={[
    { uuid: '1', name: 'Option 1' },
    { uuid: '2', name: 'Option 2' },
    { uuid: '3', name: 'Option 3' },
    { uuid: '4', name: 'Option 4' },
  ]}
  isLoading
/>;
```
