import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import _ from 'lodash';

import ResultsDrawer from '../ResultsDrawer';
import ResultsButtonBar from '../ResultsButtonBar';

const { Option } = Select;

const AttributeFilterDrawerContent = ({
  dataSets,
  parameter,
  setFilter,
  runStatus,
  taskStatus,
  details,
  targetId,
}) => {
  const optionsTarget = _.filter(dataSets, function(o) {
    return o.uuid !== targetId;
  });
  // resultados
  const [results, setResults] = useState(
    (runStatus === 'Failed' || runStatus === 'Succeeded') &&
      taskStatus === 'Succeeded'
  );
  const [showResults, setShowResults] = useState(results);
  console.log(targetId);

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
            {optionsTarget.map((item) => (
              <Option key={item.uuid} value={item.name}>
                {item.name}
              </Option>
            ))}
          </Select>
        </div>
      ) : (
        <ResultsDrawer attributesFilter={parameter} />
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

AttributeFilterDrawerContent.propTypes = {
  dataSets: PropTypes.arrayOf(PropTypes.any).isRequired,
  parameter: PropTypes.arrayOf(PropTypes.string).isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default AttributeFilterDrawerContent;
