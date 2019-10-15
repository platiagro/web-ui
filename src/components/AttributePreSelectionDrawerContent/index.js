import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { InputNumber } from 'antd';

import InfoHelper from '../InfoHelper';
import ResultsDrawer from '../ResultsDrawer';
import ResultsButtonBar from '../ResultsButtonBar';

const infoHelperContent = (
  <div>
    <p>
      Exemplo: 0,8 indica que, se existir dois atributos com índice de
      correlação entre eles maior ou igual a esse valor, um deles será excluído
      do conjunto de dados para não prejudicar o processo de treinamento de
      modelos.
    </p>
    <p>
      Os valores abaixo indicam variáveis que podem ter:
      <br />
      entre 0,9 e 1,0: correlação muito forte;
      <br />
      entre 0,7 e 0,9: correlação forte;
      <br />
      entre 0,5 e 0,7: correlação moderada;
      <br />
      entre 0,3 e 0,5: correlação fraca;
      <br />
      entre 0,0 e 0,3: correlação muito fraca ou desprezível.
    </p>
  </div>
);

const AttributePreSelectionDrawerContent = ({
  // dataSets,
  parameter,
  setCutoff,
  setCorrelation,
  runStatus,
  taskStatus,
  details,
  preType,
}) => {
  // resultados
  const [results, setResults] = useState(
    (runStatus === 'Failed' || runStatus === 'Succeeded') &&
      taskStatus === 'Succeeded'
  );
  const [showResults, setShowResults] = useState(results);
  return (
    <div>
      {!showResults ? (
        <div>
          <p>Limite de dados faltantes para um atributo</p>
          <p>
            <small>
              Valor que indica quando um atributo será excluído do conjunto de
              dados, a partir da proporção de dados faltantes. Os valores devem
              estar entre 0,0 e 1,0
            </small>
          </p>
          <InputNumber
            value={parameter.cutoff}
            onChange={setCutoff}
            decimalSeparator=','
            min={0}
            max={1}
            step={0.1}
          />
          <InfoHelper
            width={200}
            content={
              'Exemplo: 0,6 indica que os atributos com 60% ou mais' +
              ' dos dados faltantes serão excluídos do conjunto de dados.'
            }
          />

          <br />
          <br />
          <br />

          <p>Indicador máximo de correlação</p>
          <p>
            <small>
              O indicador de correlação mostra o quanto dois atributos são
              relacionados entre si. O&nbsp;
              <span style={{ textDecoration: 'underline' }}>
                indicador máximo de correlação
              </span>
              &nbsp;define um valor como ponto de corte para exclusão dos
              atributos, baseado na correlação entre eles. Os valores devem
              estar entre 0,0 e 1,0.
            </small>
          </p>
          <InputNumber
            value={parameter.correlation}
            onChange={setCorrelation}
            decimalSeparator=','
            min={0}
            max={1}
            step={0.1}
          />
          <InfoHelper width={300} content={infoHelperContent} />
        </div>
      ) : (
        <ResultsDrawer
          details={details}
          attributesPreSelection={parameter}
          preType={preType}
          table
          tableStatistics
        />
      )}
      {results ? (
        <ResultsButtonBar
          setShowResults={setShowResults}
          showResults={showResults}
        />
      ) : null}
    </div>
  );
};

AttributePreSelectionDrawerContent.propTypes = {
  // dataSets: PropTypes.arrayOf(PropTypes.any).isRequired,
  parameter: PropTypes.shape({
    cutoff: PropTypes.number,
    correlation: PropTypes.number,
  }).isRequired,
  setCorrelation: PropTypes.func.isRequired,
  setCutoff: PropTypes.func.isRequired,
};

export default AttributePreSelectionDrawerContent;
