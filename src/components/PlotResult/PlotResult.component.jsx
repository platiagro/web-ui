import React from 'react';
import PropTypes from 'prop-types';

import ImageLightbox from 'components/ImageLightbox';

const PlotResult = ({ plotImageClassName, title, description, plotUrl }) => {
  return (
    <>
      {title && (
        <p>
          <strong>{title}</strong>
        </p>
      )}

      {description && (
        <>
          <p>{description}</p>
          <br />
          <br />
        </>
      )}

      {plotUrl.includes('text/html') ? (
        <iframe title='iframe-plot' width='100%' height='600px' src={plotUrl} />
      ) : (
        <ImageLightbox className={plotImageClassName} plotUrl={plotUrl} />
      )}
    </>
  );
};

PlotResult.propTypes = {
  plotImageClassName: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  plotUrl: PropTypes.string.isRequired,
};

PlotResult.defaultProps = {
  plotImageClassName: '',
  title: undefined,
  description: undefined,
};

export default PlotResult;
