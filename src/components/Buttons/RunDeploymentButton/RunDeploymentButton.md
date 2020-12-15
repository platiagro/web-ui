```jsx
  import { CloudUploadOutlined } from '@ant-design/icons';
  import { Button } from 'uiComponents';

  const onClick = () => alert('Experimento implantado.');

  <Button type='primary' shape='round' handleClick={onClick}>
    <CloudUploadOutlined/> Implantar fluxo
  </Button>
```