// CORE LIBS
import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import PropTypes from 'prop-types';

// UI LIBS
import { DownloadOutlined } from '@ant-design/icons';

// STYLES
import './styles.less';
import 'react-image-lightbox/style.css';

/**
 * Image Lightbox.
 * This component is responsible for displaying plot result into a lightbox.
 *
 * @component
 * @param {object} props Component props
 * @returns {ColumnsTable} React component
 */
const ImageLightbox = (props) => {
  // destructuring props
  const { plotUrl } = props;

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
  /** Result plot url */
  plotUrl: PropTypes.string.isRequired,
};

export default ImageLightbox;
