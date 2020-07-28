// CORE LIBS
import React from 'react';

// COMPONENTS
// import ExperimentHeader from '../ExperimentHeader/_/Container';
import ExperimentFlow from '../ExperimentFlow/_/Container';

// CONTAINERS
// import { OperatorResizableSectionContainer } from 'containers';
import { OperatorResultsModalContainer } from 'containers';

/**
 * Experiment.
 * This component is responsible for displaying an experiment.
 */
const Experiment = () => {
  return (
    // frangment container
    <>
      {/* operator results modal */}
      <OperatorResultsModalContainer />
      {/* experiment flow */}
      <ExperimentFlow />;
    </>
  );
};

// EXPORT
export default Experiment;
