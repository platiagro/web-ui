import PropTypes from 'prop-types';
import React from 'react';
import emptyOperators from 'assets/operators_empty.png';
import './styles.less';

const OperatorsEmptyPlaceholder = ({ className, loading }) => {
  const animationClass = loading ? 'image-animated' : '';
  const placeholderText = loading
    ? 'Aguarde...'
    : 'Para criar um fluxo, arraste e solte as tarefas aqui';

  return (
    <div className={`OperatorsEmptyContainer ${className}`}>
      <h3>{placeholderText}</h3>
      <img
        className={animationClass}
        src={emptyOperators}
        alt='empty operators diagram'
      />
    </div>
  );
};

OperatorsEmptyPlaceholder.propTypes = {
  className: PropTypes.string,
  loading: PropTypes.bool,
};

OperatorsEmptyPlaceholder.defaultProps = {
  className: '',
  loading: false,
};

export default OperatorsEmptyPlaceholder;
