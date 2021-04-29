**Exemplo:**

```js
const handleClickLearnMore = () => {
  alert('Clicked');
};

const text = 'Texto para cópia';

<div>
  <p>{text}</p>
  <p>
    <CopyToClipboard text={text}>
      <button>Copiar</button>
    </CopyToClipboard>
  </p>
  <p>
    <input placeholder='Cole aqui' />
  </p>
</div>;
```
