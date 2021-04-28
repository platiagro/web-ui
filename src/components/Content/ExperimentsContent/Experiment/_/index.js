import React from 'react';

import { OperatorResultsModalContainer } from 'containers';

import ExperimentFlowContainer from '../ExperimentFlow/_/ExperimentFlowContainer';

const Experiment = () => {
  return (
    <>
      <OperatorResultsModalContainer />
      <ExperimentFlowContainer />;
    </>
  );
};

export default Experiment;
