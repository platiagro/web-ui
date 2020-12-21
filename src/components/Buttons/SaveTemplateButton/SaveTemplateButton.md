```js
    import { PartitionOutlined } from '@ant-design/icons';
    import { Button } from 'uiComponents';

    const handleClick = () => {
        alert('Novo template!')
    };

    const disabled = false;
 
    <Button 
      type='primary-inverse'
      shape='round' 
      handleClick={handleClick}
      isDisabled={disabled}
    >
      <PartitionOutlined />
      Salvar como template
    </Button>
```

Botão desabilitado.
```js
    import { PartitionOutlined } from '@ant-design/icons';
    import { Button } from 'uiComponents';

    const handleClick = () => {
        alert('Novo template!')
    };

    const disabled = true;
 
    <Button 
      type='primary-inverse'
      shape='round' 
      handleClick={handleClick}
      isDisabled={disabled}
    >
      <PartitionOutlined />
      Salvar como template
    </Button>
```