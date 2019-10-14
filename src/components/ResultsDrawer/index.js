import React from 'react';

import { Tag, Icon, Divider, Table } from 'antd';

import { getResultTable } from '../../services/resultsApi';

import { columnsResult, dataResult } from './tableMock';

import responseMock from './responseMock.json';

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

const fetchResultTable = async () => {
  const getObject = {
    task: 'feature-temporal',
    headerId: '7c3232a0-7325-4afd-a01d-9170617fac06',
  };

  const experimentId = '5260e774-0672-479d-9d8f-b4e49198a524';

  const result = await getResultTable(experimentId, getObject);

  return result;
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
}) => {
  // const resultTable = table ? fetchResultTable() : null;
  const resultTable = table ? responseMock.payload : null;
  return (
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
              <span>{resultTable.totalColumnsBefore}</span>
              <Icon type='arrow-right' />
              <span>{resultTable.totalColumnsAfter}</span>
              <Icon type='arrow-up' />
              <span>
                {`Mais ${resultTable.diff} atributos (+ ${resultTable.percentageDiff})`}
              </span>

              <br />
              <br />
            </div>
          ) : null}

          <p>
            <small>
              Exibindo N de&nbsp;
              {resultTable.totalLines}
              &nbsp;observações
            </small>
          </p>
          <Table
            dataSource={resultTable.rows} // {dataResult}
            columns={resultTable.header} // {columnsResult}
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
            A matriz de confusão mede o desemplenho de modelos de classificação,
            a partir da frequência de previsões corretas e incorretas. Para
            isso, são utilizados dados de teste com valores reais conhecidos.
          </p>

          <br />
          <br />

          <img
            alt='confusion matrix'
            src='http://localhost:3001/results/5260e774-0672-479d-9d8f-b4e49198a524/confusionMatrix'
          />
        </div>
      ) : null}
    </div>
  );
};

export default ResultsDrawer;
