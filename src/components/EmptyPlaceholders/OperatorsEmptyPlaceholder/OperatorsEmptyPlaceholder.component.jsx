import PropTypes from 'prop-types';
import React from 'react';

import { OperatorsEmpty } from 'assets';

import './styles.less';

const OperatorsEmptyPlaceholder = ({
  className,
  loading,
  placeholder,
  placeholderWhenLoading,
}) => {
  const animationClass = loading ? 'image-animated' : '';
  const placeholderText = loading ? placeholderWhenLoading : placeholder;

  return (
    <div className={`OperatorsEmptyContainer ${className}`}>
      {!!placeholderText && <h3>{placeholderText}</h3>}

      <img
        className={animationClass}
        draggable={false}
        src={OperatorsEmpty}
        alt='Operators Placeholder'
      />
    </div>
  );
};

OperatorsEmptyPlaceholder.propTypes = {
  className: PropTypes.string,
  loading: PropTypes.bool,
  placeholder: PropTypes.string,
  placeholderWhenLoading: PropTypes.string,
};

OperatorsEmptyPlaceholder.defaultProps = {
  className: '',
  loading: false,
  placeholder: '',
  placeholderWhenLoading: '',
};

export default OperatorsEmptyPlaceholder;
