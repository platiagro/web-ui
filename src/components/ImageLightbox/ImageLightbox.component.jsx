/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-image-lightbox';
import { DownloadOutlined } from '@ant-design/icons';

import './styles.less';

import 'react-image-lightbox/style.css';

const ImageLightbox = ({ className, plotUrl }) => {
  const [hasZoom, setHasZoom] = useState(false);

  const handleShowWithZoom = () => {
    setHasZoom(true);
  };

  return (
    <>
      {hasZoom && (
        <Lightbox
          mainSrc={plotUrl}
          wrapperClassName='imageLightbox'
          onCloseRequest={() => setHasZoom(false)}
          toolbarButtons={[
            <a
              key='DOWNLOAD_LINK'
              className='download-link'
              href={plotUrl}
              download={`resultado`}
            >
              <DownloadOutlined />
            </a>,
          ]}
        />
      )}

      <img
        className={className}
        style={{ cursor: 'pointer' }}
        onClick={handleShowWithZoom}
        src={plotUrl}
        alt='plot'
      />
    </>
  );
};

ImageLightbox.propTypes = {
  className: PropTypes.string,
  plotUrl: PropTypes.string.isRequired,
};

ImageLightbox.defaultProps = {
  className: '',
};

export default ImageLightbox;
