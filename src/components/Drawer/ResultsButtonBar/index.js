import React from 'react';

import { Button } from 'antd';

const ResultsButtonBar = ({ showResults, setShowResults }) => {
  return (
    <div>
      {showResults ? (
        <Button onClick={() => setShowResults(false)}>Editar</Button>
      ) : (
        <Button onClick={() => setShowResults(true)}>Resultados</Button>
      )}
    </div>
  );
};

export default ResultsButtonBar;
