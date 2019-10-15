import React, { useEffect, useState } from 'react';

import { Tag, Icon, Divider, Table, Spin } from 'antd';

import {
  getResultTable,
  getDatasetTable,
  getPlot,
} from '../../services/resultsApi';

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

const fetchResultTable = async (
  experimentId,
  task,
  headerId,
  setIsLoading,
  setResultTable
) => {
  const result = await getResultTable(experimentId, task, headerId);
  setResultTable(result);
  setIsLoading(false);
};

const fetchDatasetTable = async (
  experimentId,
  datasetId,
  setIsLoading,
  setResultTable
) => {
  const result = await getDatasetTable(experimentId, datasetId);
  setResultTable(result);
  setIsLoading(false);
};

const fetchPlot = async (experimentId, setIsLoading, setPlot) => {
  const result = await getPlot(experimentId);
  setPlot(result);
  setIsLoading(false);
};

const ResultsDrawer = ({
  target,
  timeAttributes,
  attributesPreSelection,
  preType,
  genericAttributes,
  attributesFilter,
  autoML,
  table,
  tableStatistics,
  plot,
  details,
  hideDivider,
}) => {
  const [resultTable, setResultTable] = useState(null);
  const [plotDetails, setPlot] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (table && target) {
      fetchDatasetTable(
        details.uuid,
        details.datasetId,
        setIsLoading,
        setResultTable
      );
    } else if (table) {
      let task;

      if (timeAttributes) {
        task = 'feature-temporal';
      } else if (attributesPreSelection) {
        if (preType === 1) {
          task = 'pre-selection-1';
        } else {
          task = 'pre-selection-2';
        }
      } else if (genericAttributes) {
        task = 'feature-tools';
      }

      fetchResultTable(
        details.uuid,
        task,
        details.headerId,
        setIsLoading,
        setResultTable
      );
    } else if (plot) {
      fetchPlot(details.uuid, setIsLoading, setPlot);
    } else {
      setIsLoading(false);
    }
  }, []);

  return isLoading ? (
    <Spin />
  ) : (
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
          <Tag>{details.name}</Tag>

          <br />
          <br />

          <p>Tempo de treinamento: </p>
          <Tag>{convertMinutesToTime(autoML.time)}</Tag>
        </div>
      ) : null}

      {table && resultTable ? (
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
                {`Mais ${resultTable.diff} atributos (+ ${resultTable.percentageDiff}%)`}
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

      {plot ? (
        <div>
          {hideDivider ? null : <Divider />}

          <p>
            <strong>
              {plotDetails.type === 'error-distribution'
                ? 'Gráfico de distribuição do erro'
                : 'Matriz de confusão'}
            </strong>
          </p>
          {plotDetails.type === 'error-distribution' ? (
            <p>
              O gráfico de distribuição do erro indica o desempenho de modelos
              para problemas de regressão, a partir das inferências. Para isso,
              são utilizados dados de teste com valores reais conhecidos.
            </p>
          ) : (
            <p>
              A matriz de confusão mede o desemplenho de modelos de
              classificação, a partir da frequência de previsões corretas e
              incorretas. Para isso, são utilizados dados de teste com valores
              reais conhecidos.
            </p>
          )}

          <br />
          <br />

          <img alt='plot' src={plotDetails.imageUrl} />
        </div>
      ) : null}
    </div>
  );
};

export default ResultsDrawer;
