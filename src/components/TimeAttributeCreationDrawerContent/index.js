import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Select, Icon, Radio, Divider, Table } from 'antd';

import ResultsDrawer from '../ResultsDrawer';
import ResultsButtonBar from '../ResultsButtonBar';

import './style.scss';

const { Option } = Select;

const radioStyle = {
  display: 'block',
};

const columns = [
  {
    title: 'Fruta',
    dataIndex: 'fruit',
  },
  {
    title: 'Preço Kg',
    dataIndex: 'priceKg',
  },
  {
    title: 'Colheita',
    dataIndex: 'harvest',
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
    priceKg: '4,00',
    harvest: '01/01/2019',
    averagePrice: '4,00',
  },
  {
    key: '2',
    fruit: 'banana',
    priceKg: '5,00',
    harvest: '02/01/2019',
    averagePrice: '5,00',
  },
  {
    key: '3',
    fruit: 'banana',
    priceKg: '6,00',
    harvest: '03/01/2019',
    averagePrice: '6,00',
  },
  {
    key: '4',
    fruit: 'banana',
    priceKg: '7,00',
    harvest: '04/01/2019',
    averagePrice: '7,00',
  },
  {
    key: '5',
    fruit: 'banana',
    priceKg: '8,00',
    harvest: '05/01/2019',
    averagePrice: '8,00',
  },
];

const TimeAttributeCreationDrawerContent = ({
  dataSets,
  parameter,
  setGroup,
  setPeriod,
  runStatus,
  taskStatus,
  details,
  targetId,
}) => {
  // resultados
  const [results, setResults] = useState(
    (runStatus === 'Failed' || runStatus === 'Succeeded') &&
      taskStatus === 'Succeeded'
  );
  const [showResults, setShowResults] = useState(results);
  // results = {
  //   table: {
  //     header: [],
  //     rows: [
  //       [],
  //       [],
  //     ]
  //   },
  //   attributesBefore: 15,
  //   attributesAfter: 45,
  // }
  const options = _.filter(dataSets, ['datatype', 'factor']);
  const optionsTarget = _.filter(options, function(o) {
    return o.uuid !== targetId;
  });

  return (
    <div>
      {!showResults ? (
        <div>
          <p>Agrupamento de atributos</p>
          <p>
            <small>
              Selecione os atributos categóricos (definidos por categorias) que
              serão agrupados para criar novos atributos.
            </small>
          </p>
          <Select
            onChange={setGroup}
            mode='multiple'
            style={{ width: '100%' }}
            placeholder='Selecione'
            value={parameter.group}
          >
            {optionsTarget.map((item) => (
              <Option key={item.uuid} value={item.name}>
                {item.name}
              </Option>
            ))}
          </Select>
          <p style={{ marginTop: 10 }}>
            <Icon type='exclamation-circle' />
            <span style={{ marginLeft: 10 }}>
              A escolha dos atributos afetará também a criação de atributos
              genéricos.
            </span>
          </p>

          <br />

          <p>Período de agrupamento</p>
          <p>
            <small>
              Com o período serão calculadas medidas em relação a momentos
              anteriores ao atual. Exemplo: média de preço dos últimos 3, 6 e 9
              dias ou meses.
            </small>
          </p>
          <Radio.Group onChange={setPeriod} value={parameter.period}>
            <Radio style={radioStyle} value='none'>
              Nenhum
            </Radio>
            <Radio style={radioStyle} value='daily'>
              Diário
            </Radio>
            <Radio style={radioStyle} value='month'>
              Mensal
            </Radio>
            <Radio style={radioStyle} value='daily,month'>
              Diário e Mensal
            </Radio>
          </Radio.Group>

          <br />
          <br />

          <Divider orientation='left'>
            <Icon type='bulb' />
            Dica
          </Divider>

          <p>
            <small>
              Suponha que o seu conjunto de dados contenha os atributos Fruta,
              Preço Kg e Colheita.
            </small>
          </p>
          <p>
            <small>
              Abaixo, o atributo Preço Médio (média de preço nos 3 últimos dias
              de colheita) foi criado a partir do agrupamento do atributo Fruta
              e do período Diário.
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
      ) : (
        <ResultsDrawer
          details={details}
          timeAttributes={parameter}
          table
          tableStatistics
        />
      )}
      {results && taskStatus === 'Failed' ? (
        <ResultsButtonBar
          setShowResults={setShowResults}
          showResults={showResults}
        />
      ) : null}
    </div>
  );
};

TimeAttributeCreationDrawerContent.propTypes = {
  dataSets: PropTypes.arrayOf(PropTypes.any).isRequired,
  parameter: PropTypes.shape({
    period: PropTypes.string,
    group: PropTypes.array,
  }).isRequired,
  setGroup: PropTypes.func.isRequired,
  setPeriod: PropTypes.func.isRequired,
};
export default TimeAttributeCreationDrawerContent;
