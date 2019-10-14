import React from 'react';

import { Tag, Icon, Divider, Table } from 'antd';

import { columnsResult, dataResult } from './tableMock';

const timeGroup = {
  none: 'Nenhum',
  daily: 'Diário',
  monthly: 'Mensal',
  dailyMonthly: 'Diário e Mensal',
};

const convertToLocaleBr = (number) => number.toLocaleString('pt-BR');

const convertMinutesToTime = (minutesReceived) => {
  const dateObj = new Date(minutesReceived * 60 * 1000);
  const hours = dateObj.getUTCHours();
  const minutes = dateObj.getUTCMinutes();
  const seconds = dateObj.getSeconds();

  const timeString = `${hours
    .toString()
    .padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return timeString;
};

const ResultsDrawer = ({
  target,
  timeAttributes,
  attributesPreSelection,
  genericAttributes,
  attributesFilter,
  autoML,
  table,
  tableStatistics,
  confusionMatrix,
}) => (
  <div>
    {timeAttributes ? (
      <div>
        <p>Atributos agrupados: </p>
        {timeAttributes.group.map((attribute) => (
          <Tag key={attribute}>{attribute}</Tag>
        ))}

        <br />
        <br />

        <p>Período de agrupamento: </p>
        <Tag>{timeGroup[timeAttributes.period]}</Tag>
      </div>
    ) : null}

    {target ? (
      <div>
        <p>Alvo: </p>
        <Tag>{target}</Tag>
      </div>
    ) : null}

    {attributesPreSelection ? (
      <div>
        <p>Limite de dados faltantes para um atributo: </p>
        <Tag>{convertToLocaleBr(attributesPreSelection.cutoff)}</Tag>

        <br />
        <br />

        <p>Indicador máximo de correlação: </p>
        <Tag>{convertToLocaleBr(attributesPreSelection.correlation)}</Tag>
      </div>
    ) : null}

    {genericAttributes ? (
      <div>
        <p>Atributos agrupados: </p>
        {genericAttributes.group.map((attribute) => (
          <Tag key={attribute}>{attribute}</Tag>
        ))}
      </div>
    ) : null}

    {attributesFilter ? (
      <div>
        <p>Atributos excluídos: </p>
        {attributesFilter.map((attribute) => (
          <Tag key={attribute}>{attribute}</Tag>
        ))}
      </div>
    ) : null}

    {autoML ? (
      <div>
        <p>Nome do modelo: </p>
        <Tag>neighbourhood_group</Tag>

        {console.log(autoML)}

        <br />
        <br />

        <p>Tempo de treinamento: </p>
        <Tag>{convertMinutesToTime(autoML.time)}</Tag>
      </div>
    ) : null}

    {table ? (
      <div>
        <Divider />

        {tableStatistics ? (
          <div>
            <p>
              <strong>Atributos resultantes</strong>
            </p>
            <span>15 </span>
            <Icon type='arrow-right' />
            <span> 45 </span>
            <Icon type='arrow-up' />
            <span>Mais 30 atributos (+ 200%)</span>

            <br />
            <br />
          </div>
        ) : null}

        <p>
          <small>Exibindo N de 1.234 observações</small>
        </p>
        <Table
          dataSource={dataResult}
          columns={columnsResult}
          size='middle'
          pagination={false}
          // scroll={{ y: 340 }}
        />
      </div>
    ) : null}

    {confusionMatrix ? (
      <div>
        <Divider />

        <p>
          <strong>Matriz de confusão</strong>
        </p>
        <p>
          A matriz de confusão mede o desemplenho de modelos de classificação, a
          partir da frequência de previsões corretas e incorretas. Para isso,
          são utilizados dados de teste com valores reais conhecidos.
        </p>

        <br />
        <br />

        <img
          alt='confusion matrix'
          src='https://www.oreilly.com/library/view/machine-learning-with/9781789343700/assets/c3c87197-7a32-4095-a4f8-7ea43559918d.png'
        />
      </div>
    ) : null}
  </div>
);

export default ResultsDrawer;
