// CORE LIBS
import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import PropTypes from 'prop-types';

// UI LIBS
import { DownloadOutlined } from '@ant-design/icons';

// STYLES
import './styles.scss';
import 'react-image-lightbox/style.css';

/**
 * Image Lightbox.
 * This component is responsible for displaying plot result into a lightbox.
 *
 * @param root0
 * @param root0.plotUrl
 */
const ImageLightbox = ({ plotUrl }) => {
  const [zoom, setZoom] = useState(false);

  return (
    <>
      {zoom && (
        <Lightbox
          wrapperClassName='imageLightbox'
          mainSrc={plotUrl}
          toolbarButtons={[
            <a className='download-link' href={plotUrl} download={`resultado`}>
              <DownloadOutlined />
            </a>,
          ]}
          onCloseRequest={() => setZoom(false)}
        />
      )}
      <img
        style={{ cursor: 'pointer' }}
        onClick={() => setZoom(true)}
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
