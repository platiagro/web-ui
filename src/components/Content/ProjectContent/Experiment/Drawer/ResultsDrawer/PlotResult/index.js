// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

//COMPONENTS
import ImageLightbox from './ImageLightbox';

/**
 * Plot Result.
 * This component is responsible for displaying plot result.
 */
const PlotResult = ({ title, description, plotUrl }) => (
  // div container
  <div>
    {title && (
      /* rendering title */
      <p>
        <strong>{title}</strong>
      </p>
    )}
    {description && (
      <>
        {/* rendering description */}
        <p>{description}</p>
        {/* breaking line */}
        <br />
        <br />
      </>
    )}
    {/* rendering plot */}
    <ImageLightbox plotUrl={plotUrl} />
  </div>
);

// PROP TYPES
PlotResult.propTypes = {
  /** plot result title string */
  title: PropTypes.string,
  /** plot result description string */
  description: PropTypes.string,
  /** plot result plot url string */
  plotUrl: PropTypes.string.isRequired,
};

// Specifies the default values for props:
PlotResult.defaultProps = {
  /** plot result title */
  title: undefined,
  /** plot result description */
  description: undefined,
};

// EXPORT
export default PlotResult;
