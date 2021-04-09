// REACT LIBS
import React from 'react';
import PropTypes from 'prop-types';

import './styles.less';

const LogBlock = (props) => {
  const { logContent } = props;

  return (
    <div className='sideBar'>
      {Array.isArray(logContent) ? (
        <div className='errorMessageContainer'>
          {logContent.map((line, index) => {
            return <p key={index}>{line}</p>;
          })}
        </div>
      ) : (
        <div className='errorMessageContainer'>{<p>{logContent}</p>}</div>
      )}
    </div>
  );
};

LogBlock.propTypes = {
  logContent: PropTypes.array,
};

LogBlock.defaultProps = {
  logContent: undefined,
};

export default LogBlock;
