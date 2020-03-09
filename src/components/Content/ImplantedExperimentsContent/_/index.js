// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import ImplantedExperimentsEmpty from '../ImplantedExperimentsEmpty';
import ImplantedExperimentsTable from '../ImplantedExperimentsTable/_';

/**
 * Implantend Experiments Content.
 * This component is responsible for displaying the implanted experiments content.
 */
const ImplantedExperimentsContent = ({ implantedExperiments }) => (
  <div>
    {/* rendering implanted experiments table or implanted experiments empty */}
    {implantedExperiments.length > 0 ? (
      <ImplantedExperimentsTable
        implantedExperiments={implantedExperiments}
        handleTestInference={
          (uuid, file) => alert(`TEST ID ${uuid} FILENAME: ${file.name}`)
          // eslint-disable-next-line
        }
      />
    ) : (
      <ImplantedExperimentsEmpty />
    )}
  </div>
);

// PROP TYPES
ImplantedExperimentsContent.propTypes = {
  /** implanted experiments content implanted experiments list */
  implantedExperiments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

// EXPORT
export default ImplantedExperimentsContent;
