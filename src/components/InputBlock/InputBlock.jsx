// REACT LIBS
import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import { TooltipTip } from 'components';

// STYLES
import './InputBlock.scss';

/**
 * This component render a input with a title and a tip.
 *
 * @param {object} props Component props
 * @returns {InputBlock} Component
 * @component
 * @example
 * // Input
 * const children = <input />;
 * // Tip text
 * const tip = 'Tip text!';
 * // Input title
 * const title = 'Input title!';
 *
 * return (
 *  <div>
 *    <InputBlock tip={tip} title={title}>
 *      {children}
 *    </InputBlock>
 *  </div>
 * );
 */
const InputBlock = (props) => {
  // destructuring props
  const { title, tip, children } = props;

  // rendering component
  return (
    <div className='inputBlock'>
      <div className='inputBlockHeader'>
        <p className='inputBlockTitle'>
          <strong>{title}</strong>
        </p>
        {tip && (
          <div className='inputBlockTip'>
            <TooltipTip
              iconType='question'
              isTooltipBelow={false}
              tooltipText={tip}
            />
          </div>
        )}
      </div>
      <div className='inputBlockInput'>{children}</div>
    </div>
  );
};

// PROP TYPES
InputBlock.propTypes = {
  /** Input */
  children: PropTypes.node.isRequired,
  /** Tip text */
  tip: PropTypes.string,
  /** Input title */
  title: PropTypes.string.isRequired,
};

// DEFAULT PROPS
InputBlock.defaultProps = {
  /** Tip text */
  tip: undefined,
};

// EXPORT DEFAULT
export default InputBlock;
