// CORE LIBS
import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import PropTypes from 'prop-types';

// UI LIBS
import { Icon as LegacyIcon } from '@ant-design/compatible';

// STYLES
import './styles.scss';
import 'react-image-lightbox/style.css';

/**
 * Image Lightbox.
 * This component is responsible for displaying plot result into a lightbox.
 */
const ImageLightbox = ({ plotUrl }) => {
  const [zoom, setZoom] = useState(false);

  return (
    <>
      {zoom && (
        <Lightbox
          mainSrc={plotUrl}
          toolbarButtons={[
            <a className='download-link' href={plotUrl} download={`resultado`}>
              <LegacyIcon type='download' />
            </a>,
          ]}
          onCloseRequest={() => setZoom(false)}
        />
      )}
      <img
        style={{ cursor: 'pointer' }}
        onClick={() => setZoom(true)}
        width='100%'
        alt='plot'
        src={plotUrl}
      />
    </>
  );
};

// PROP TYPES
ImageLightbox.propTypes = {
  /** plot result plot url string */
  plotUrl: PropTypes.string.isRequired,
};

export default ImageLightbox;
