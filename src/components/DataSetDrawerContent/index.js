import React from 'react';

import { Upload, Button, Icon, Divider } from 'antd';

import DataSetTable from '../DataSetTable';

const DataSetDrawerContent = () => (
  <div>
    <p>Arquivo .csv com os dados de entrada</p>
    <Upload>
      <Button>
        <Icon type='upload' />
        Selecionar
      </Button>
    </Upload>

    <br />

    <p>
      Cabeçalho com os atributos
      <small>(Opcional)</small>
    </p>
    <Upload>
      <Button>
        <Icon type='upload' />
        Selecionar cabeçalho
      </Button>
    </Upload>

    <br />

    <Button>Importar</Button>

    <br />

    <Divider />

    <br />

    <DataSetTable />
  </div>
);

export default DataSetDrawerContent;
