import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

import ResultsDrawer from '../ResultsDrawer';
import ResultsButtonBar from '../ResultsButtonBar';

const { Option } = Select;

const AttributeFilterDrawerContent = ({
  dataSets,
  parameter,
  setFilter,
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
          <p>Atributos excluídos</p>
          <p>
            <small>Selecione os atributos que serão excluídos.</small>
          </p>
          <Select
            onChange={setFilter}
            value={parameter}
            mode='multiple'
            style={{ width: '100%' }}
            placeholder='Selecione'
          >
            {dataSets.map((item) => (
              <Option key={item.uuid} value={item.name}>
                {item.name}
              </Option>
            ))}
          </Select>
        </div>
      ) : (
        <ResultsDrawer attributesFilter />
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

AttributeFilterDrawerContent.propTypes = {
  dataSets: PropTypes.arrayOf(PropTypes.any).isRequired,
  parameter: PropTypes.arrayOf(PropTypes.string).isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default AttributeFilterDrawerContent;
