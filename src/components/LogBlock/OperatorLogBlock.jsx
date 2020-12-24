// REACT LIBS
import React from 'react';
import PropTypes from 'prop-types';

import './LogBlock.less';

/**
 *  Component to display log from operator experiment notebook
 * 
 * @param {object} props Component props
 * @returns {OperatorLogBlock} Component
 */
const OperatorLogBlock = (props) => {
  const { logContent } = props;

  return (
    <div className='sideBar'>
      {Array.isArray(logContent) ? (
        <div className='errorMessageContainer'>
          {
            logContent.map((line, index) => {
              return(<p key={index}>{line}</p>)
              }
            )
          }
        </div>
      ):(
        <div className='errorMessageContainer'>
          {
            <p>{logContent}</p>
          }
        </div>
      )}
    </div>
  );
};

OperatorLogBlock.propTypes = {
  logContent: PropTypes.array,
};

OperatorLogBlock.defaultProps = {
  logContent: undefined,
};

export default OperatorLogBlock;
