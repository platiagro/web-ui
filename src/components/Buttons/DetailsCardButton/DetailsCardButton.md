**Default**

```js
const onClick = (val) => {
  alert(`Clicou em ${val}`);
};

<div>
  <DetailsCardButton
    projectLoading={false}
    numberText={2}
    onClick={() => onClick('Experimentação')}
  />

  <br />
  <DetailsCardButton
    projectLoading={false}
    numberText={1}
    type='deployment'
    onClick={() => onClick('Fluxo')}
  />
</div>;
```

**Sem fluxos**

```js
const onClick = (val) => {
  alert(`Clicou em ${val}`);
};

<div>
  <DetailsCardButton
    projectLoading={false}
    numberText={0}
    onClick={() => onClick('Experimentação')}
  />

  <br />
  <DetailsCardButton
    projectLoading={false}
    numberText={0}
    type='deployment'
    onClick={() => onClick('Fluxo')}
  />
</div>;
```

**Com Loading**

```js
const onClick = (val) => {
  alert(`Clicou em ${val}`);
};

<div>
  <DetailsCardButton
    projectLoading={true}
    numberText={3}
    onClick={() => onClick('Experimentação')}
  />

  <br />
  <DetailsCardButton
    projectLoading={true}
    numberText={0}
    type='deployment'
    onClick={() => onClick('Fluxo')}
  />
</div>;
```
