import React from 'react';
import PropTypes from 'prop-types';

import ImageLightbox from 'components/ImageLightbox';

const PlotResult = (props) => {
  const { title, description, plotUrl } = props;

  return (
    <div>
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
        <ImageLightbox plotUrl={plotUrl} />
      )}
    </div>
  );
};

PlotResult.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  plotUrl: PropTypes.string.isRequired,
};

PlotResult.defaultProps = {
  title: undefined,
  description: undefined,
};

export default PlotResult;
