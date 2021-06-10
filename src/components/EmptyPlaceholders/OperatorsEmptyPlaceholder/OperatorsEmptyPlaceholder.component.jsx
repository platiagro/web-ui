import PropTypes from 'prop-types';
import React from 'react';
import emptyOperators from 'assets/operators_empty.png';
import './styles.less';

const OperatorsEmptyPlaceholder = ({ className }) => {
  return (
    <div className={`OperatorsEmptyContainer ${className}`}>
      <h3>Para criar um fluxo, arraste e solte as tarefas aqui</h3>
      <img src={emptyOperators} alt='empty operators diagram' />
    </div>
  );
};

OperatorsEmptyPlaceholder.propTypes = {
  className: PropTypes.string,
};

OperatorsEmptyPlaceholder.defaultProps = {
  className: '',
};

export default OperatorsEmptyPlaceholder;
