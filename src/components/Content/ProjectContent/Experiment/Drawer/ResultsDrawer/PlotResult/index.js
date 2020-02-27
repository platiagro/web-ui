// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Plot Result.
 * This component is responsible for displaying plot result.
 */
const PlotResult = ({ title, description, plotUrl }) => (
  // div container
  <div>
    {/* rendering title */}
    <p>
      <strong>{title}</strong>
    </p>
    {/* rendering description */}
    <p>{description}</p>
    {/* breaking line */}
    <br />
    <br />
    {/* rendering plot */}
    <img alt='plot' src={plotUrl} />
  </div>
);

// PROP TYPES
PlotResult.propTypes = {
  /** plot result title string */
  title: PropTypes.string.isRequired,
  /** plot result description string */
  description: PropTypes.string.isRequired,
  /** plot result plot url string */
  plotUrl: PropTypes.string.isRequired,
};

// EXPORT
export default PlotResult;
