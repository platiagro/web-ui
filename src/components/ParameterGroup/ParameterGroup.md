**Exemplo:**

```js
const input = {
  default: 1,
  description: 'Desc',
  label: 'Label',
  name: 'Parameter name',
  type: 'number',
  value: 1,
};
const loading = false;
const onChange = (name, currentValue) => {
  console.log(name, currentValue);
};
const trainingLoading = false;
const valueLatestTraining = 1;
<ParameterGroup
  input={input}
  loading={loading}
  onChange={onChange}
  trainingLoading={trainingLoading}
  valueLatestTraining={valueLatestTraining}
/>;
```
