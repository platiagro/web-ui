import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { InputNumber } from 'antd';

import ResultsDrawer from '../ResultsDrawer';
import ResultsButtonBar from '../ResultsButtonBar';

const AutoMLDrawerContent = ({
  parameter,
  setAutoML,
  runStatus,
  taskStatus,
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
          <p>Por quanto tempo você quer treinar o seu modelo?</p>
          <InputNumber
            onChange={setAutoML}
            value={parameter.time}
            min={1}
            max={10}
          />
          <small> minutos</small>
        </div>
      ) : (
        <ResultsDrawer autoML={parameter} confusionMatrix />
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
AutoMLDrawerContent.propTypes = {
  // dataSets: PropTypes.arrayOf(PropTypes.any).isRequired,
  parameter: PropTypes.objectOf(PropTypes.number).isRequired,
  setAutoML: PropTypes.func.isRequired,
};
export default AutoMLDrawerContent;
