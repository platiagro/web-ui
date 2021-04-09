**Default**

```js
<NumberInputBlock
  handleChange={() => alert('Changed')}
  title='The Title'
  name='Name'
  tip='Description'
  min={0}
  max={10}
  step={1}
  value={5}
  placeholder='Type a Number'
  valueLatestTraining={5}
/>
```

**Disabled**

```js
<NumberInputBlock
  handleChange={() => alert('Changed')}
  title='The Title'
  name='Name'
  tip='Description'
  min={0}
  max={10}
  step={1}
  value={5}
  placeholder='Type a Number'
  valueLatestTraining={5}
  isDisabled
/>
```

**Loading**

```js
<NumberInputBlock
  handleChange={() => alert('Changed')}
  title='The Title'
  name='Name'
  tip='Description'
  min={0}
  max={10}
  step={1}
  value={5}
  placeholder='Type a Number'
  valueLatestTraining={5}
  isLoading
/>
```
