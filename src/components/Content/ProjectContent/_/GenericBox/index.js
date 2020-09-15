import React from 'react';
import PropTypes from 'prop-types';

const GenericBox = ({ name, icon }) => {
  return (
    <div className='card' style={{ width: '200px', opacity: 0.8 }}>
      <div className='siders'>
        <div style={{ fontSize: '18px' }}>{icon}</div>
      </div>
      <div className='middle'>{name}</div>
      <div className='siders'></div>
    </div>
  );
};

GenericBox.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

export default GenericBox;
