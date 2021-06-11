import React from 'react';
import PropTypes from 'prop-types';

const Logo = ({ logoSrc, className, altText, collapse, collapsedSrc }) => (
  <div className={className}>
    {collapse ? (
      <img src={collapsedSrc} alt={altText} />
    ) : (
      <img src={logoSrc} alt={altText} />
    )}
  </div>
);

Logo.propTypes = {
  logoSrc: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  collapse: PropTypes.bool.isRequired,
  collapsedSrc: PropTypes.string.isRequired,
};

export default Logo;
