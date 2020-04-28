// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Logo.
 * This component is responsible for displaying logo.
 */
const Logo = ({ logoSrc, className, altText }) => (
  // logo div container
  <div className={className}>
    {/* logo image */}
    <img src={logoSrc} alt={altText} />
  </div>
);

// PROP TYPES
Logo.propTypes = {
  /** logo image src string */
  logoSrc: PropTypes.string.isRequired,
  /** logo css class string */
  className: PropTypes.string.isRequired,
  /** logo alt text string */
  altText: PropTypes.string.isRequired,
};

// EXPORT
export default Logo;
