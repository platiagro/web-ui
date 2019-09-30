import React from 'react';

import { Select, Icon, Divider, Table } from 'antd';

import './style.scss';

const { Option } = Select;

const columns = [
  {
    title: 'Fruta',
    dataIndex: 'fruit',
  },
  {
    title: 'Tipo',
    dataIndex: 'type',
  },
  {
    title: 'Preço Kg',
    dataIndex: 'priceKg',
  },
  {
    title: 'Preço Médio',
    dataIndex: 'averagePrice',
  },
];

const data = [
  {
    key: '1',
    fruit: 'banana',
    type: 'nanica',
    priceKg: '3,50',
    averagePrice: '3,75',
  },
  {
    key: '2',
    fruit: 'banana',
    type: 'nanica',
    priceKg: '4,00',
    averagePrice: '3,75',
  },
  {
    key: '3',
    fruit: 'banana',
    type: 'prata',
    priceKg: '5,00',
    averagePrice: '5,00',
  },
  {
    key: '4',
    fruit: 'maçã',
    type: 'gala',
    priceKg: '4,50',
    averagePrice: '4,50',
  },
];

const GenericAttributeCreationDrawerContent = () => (
  <div>
    <p>Agrupamento de atributos</p>
    <p>
      <small>
        Selecione os atributos categóricos (definidos por categorias) que serão
        agrupados para criar novos atributos.
      </small>
    </p>
    <Select mode='multiple' style={{ width: '100%' }} placeholder='Selecione'>
      <Option value='typeOne'>Tipo Um</Option>
      <Option value='typeTwo'>Tipo Dois</Option>
      <Option value='typeThree'>Tipo Três</Option>
      <Option value='typeFour'>Tipo Quatro</Option>
    </Select>
    <p style={{ marginTop: 10 }}>
      <Icon type='exclamation-circle' />
      <span style={{ marginLeft: 10 }}>
        A escolha dos atributos afetará também a criação de atributos por tempo.
      </span>
    </p>

    <br />
    <br />

    <Divider orientation='left'>
      <Icon type='bulb' />
      Dica
    </Divider>

    <p>
      <small>
        Suponha que o seu conjunto de dados contenha os atributos Fruta, Tipo e
        Preço.
      </small>
    </p>
    <p>
      <small>
        A partir do agrupamento de atributos, novos serão criados. Abaixo, o
        atributo Preço Médio foi criado a partir do agrupamento de Fruta e Tipo.
      </small>
    </p>
    <Table
      className='tipTable'
      columns={columns}
      dataSource={data}
      size='middle'
      pagination={false}
    />
  </div>
);

export default GenericAttributeCreationDrawerContent;
