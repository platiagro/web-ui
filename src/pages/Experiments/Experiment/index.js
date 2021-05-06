import React from 'react';

import { OperatorResultsModalContainer } from 'containers';

import ExperimentFlowContainer from './ExperimentFlow/ExperimentFlowContainer';

const Experiment = () => {
  return (
    <>
      <OperatorResultsModalContainer />
      <ExperimentFlowContainer />;
    </>
  );
};

export default Experiment;
