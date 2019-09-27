import React from 'react';

import { Upload, Button, Icon, Divider, Select } from 'antd';

import DataSetTable from '../DataSetTable';
import InfoHelper from '../InfoHelper';

const { Option } = Select;

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

    <Divider />

    <p>Qual é o seu atributo alvo?</p>
    <Select style={{ width: 200 }} placeholder='Selecione'>
      <Option value='id'>id</Option>
      <Option value='hour'>hora</Option>
      <Option value='type'>Tipo</Option>
    </Select>

    <InfoHelper content='Seu modelo será treinado para prever os valores do alvo.' />

    <br />
    <br />

    <DataSetTable />
  </div>
);

export default DataSetDrawerContent;
