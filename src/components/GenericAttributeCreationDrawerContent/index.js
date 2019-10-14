import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

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

const GenericAttributeCreationDrawerContent = ({
  dataSets,
  parameter,
  setFeatureTools,
}) => {
  const options = _.filter(dataSets, ['datatype', 'factor']);
  return (
    <div>
      <p>Agrupamento de atributos</p>
      <p>
        <small>
          Selecione os atributos categóricos (definidos por categorias) que
          serão agrupados para criar novos atributos.
        </small>
      </p>
      <Select
        value={parameter.group}
        onChange={setFeatureTools}
        mode='multiple'
        style={{ width: '100%' }}
        placeholder='Selecione'
      >
        {options.map((item) => (
          <Option key={item.uuid} value={item.name}>
            {item.name}
          </Option>
        ))}
      </Select>
      <p style={{ marginTop: 10 }}>
        <Icon type='exclamation-circle' />
        <span style={{ marginLeft: 10 }}>
          A escolha dos atributos afetará também a criação de atributos por
          tempo.
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
          Suponha que o seu conjunto de dados contenha os atributos Fruta, Tipo
          e Preço.
        </small>
      </p>
      <p>
        <small>
          A partir do agrupamento de atributos, novos serão criados. Abaixo, o
          atributo Preço Médio foi criado a partir do agrupamento de Fruta e
          Tipo.
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
};

GenericAttributeCreationDrawerContent.propTypes = {
  dataSets: PropTypes.arrayOf(PropTypes.any).isRequired,
  parameter: PropTypes.shape({
    group: PropTypes.array,
  }).isRequired,
  setFeatureTools: PropTypes.func.isRequired,
};
export default GenericAttributeCreationDrawerContent;
