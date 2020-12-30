// REACT LIBS
import PropTypes from 'prop-types';
import React from 'react';

// COMPONENTS
import { ExclamationCircleFilled } from '@ant-design/icons';
import { TooltipTip } from 'components';

// STYLES
import './PropertyBlock.component.style.less';

/**
 * This component is responsible for render a block with a title and a tip.
 */
const PropertyBlock = (props) => {
  const { children, status, tip, title } = props;
  const ExclamationCircleStyle = {
    fontSize: '14px',
    color: '#CF1322',
    float: 'left',
    padding: '3px 6px',
  };

  return (
    <div className='propertyBlock'>
      {title && (
        <div className='propertyBlockHeader'>
          {status === 'Failed' && (
            <ExclamationCircleFilled style={ExclamationCircleStyle} />
          )}
          <p className='propertyBlockTitle'>
            <strong>{title}</strong>
          </p>
          {tip && (
            <div className='propertyBlockTip'>
              <TooltipTip
                iconType='question'
                isTooltipBelow={false}
                tooltipText={tip}
              />
            </div>
          )}
        </div>
      )}
      <div className='propertyBlockInput'>{children}</div>
    </div>
  );
};

// PROP TYPES
PropertyBlock.propTypes = {
  /** Html element or react component*/
  children: PropTypes.node.isRequired,
  /** Operator status */
  status: PropTypes.string,
  /** Tip text */
  tip: PropTypes.string,
  /** Input title */
  title: PropTypes.string,
};

// DEFAULT PROPS
PropertyBlock.defaultProps = {
  status: undefined,
  tip: undefined,
  title: undefined,
};

// EXPORT DEFAULT
export default PropertyBlock;
