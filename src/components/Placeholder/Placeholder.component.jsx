import React from 'react';
import PropTypes from 'prop-types';

import './styles.less';

const Placeholder = ({ className, style, iconComponent, message }) => {
  return (
    <div style={style} className={`placeholder ${className}`}>
      <div className='placeholder-icon'>{iconComponent}</div>
      <div>{message}</div>
    </div>
  );
};

Placeholder.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  iconComponent: PropTypes.element.isRequired,
  message: PropTypes.string.isRequired,
};

Placeholder.defaultProps = {
  className: '',
  style: undefined,
};

export default Placeholder;
