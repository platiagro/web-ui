**Exemplo:**

```js
const parameter = {
  default: 1,
  description: 'Desc',
  label: 'Label',
  name: 'Parameter name',
  type: 'number',
  value: 1,
};
const loading = false;
const parameter = { type: 'string' };
const onChange = (name, currentValue) => {
  console.log(name, currentValue);
};
const trainingLoading = false;
const valueLatestTraining = 1;
<ParameterGroup
  parameter={parameter}
  loading={loading}
  onChange={onChange}
  trainingLoading={trainingLoading}
  valueLatestTraining={valueLatestTraining}
/>;
```
