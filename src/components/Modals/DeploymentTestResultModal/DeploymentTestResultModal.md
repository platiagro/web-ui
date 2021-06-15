**With Image**

```js
const [visible, setVisible] = React.useState(false);

const experiments = {
  binData:
    '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',
  meta: {
    tags: {
      'content-type': 'image/jpeg',
    },
  },
};

const handleClone = () => {
  setVisible(false);
};

<div>
  <button onClick={() => setVisible(true)}>Open modal</button>

  <DeploymentTestResultModal
    visible={visible}
    closeModal={handleClone}
    experimentInference={experiments}
  />
</div>;
```

**With Text**

```js
const [visible, setVisible] = React.useState(false);

const experiments = {
  meta: {},
  strData: 'The quick brown fox jumps over the lazy dog',
};

const handleClose = () => {
  setVisible(false);
};

<div>
  <button onClick={() => setVisible(true)}>Open modal</button>

  <DeploymentTestResultModal
    visible={visible}
    closeModal={handleClose}
    experimentInference={experiments}
  />
</div>;
```

**With Table**

```js
const [visible, setVisible] = React.useState(false);

const experiments = {
  data: {
    names: ['feat_1', 'feat_2', 'predict_class', 'predict_proba_0'],
    ndarray: [[0.6445111, 0.0139017, 0.1, 0.0]],
  },
  meta: {},
};

const handleClose = () => {
  setVisible(false);
};

<div>
  <button onClick={() => setVisible(true)}>Open modal</button>

  <DeploymentTestResultModal
    visible={visible}
    closeModal={handleClose}
    experimentInference={experiments.data}
  />
</div>;
```

**With Error**

```js
const [visible, setVisible] = React.useState(false);

const handleClose = () => {
  setVisible(false);
};

<div>
  <button onClick={() => setVisible(true)}>Open modal</button>

  <DeploymentTestResultModal
    visible={visible}
    closeModal={handleClose}
    experimentInference={null}
  />
</div>;
```
