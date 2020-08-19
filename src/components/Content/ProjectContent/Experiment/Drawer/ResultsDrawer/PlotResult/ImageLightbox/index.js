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
  const { plotSvg } = props;

  const [zoom, setZoom] = useState(false);

  // transform svg string in blob
  const plotSvgBlob = new Blob([plotSvg], { type: 'image/svg+xml' });
  // creating plot url
  const plotSvgUrl = URL.createObjectURL(plotSvgBlob);

  return (
    <>
      {zoom && (
        <Lightbox
          wrapperClassName='imageLightbox'
          mainSrc={plotSvgUrl}
          toolbarButtons={[
            <a
              className='download-link'
              href={plotSvgUrl}
              download={`resultado`}
            >
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
        src={plotSvgUrl}
      />
    </>
  );
};

// PROP TYPES
ImageLightbox.propTypes = {
  /** Results plot inline svg */
  plotSvg: PropTypes.string.isRequired,
};

export default ImageLightbox;
