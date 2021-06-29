import React from 'react';
import PropTypes from 'prop-types';
import { ExclamationCircleFilled } from '@ant-design/icons';

import { TooltipTip } from 'components';

import './PropertyBlock.component.style.less';

const PropertyBlock = ({ children, status, tip, title }) => {
  return (
    <div className='propertyBlock'>
      {title && (
        <div className='propertyBlockHeader'>
          {status === 'Failed' && (
            <ExclamationCircleFilled
              style={{
                fontSize: '14px',
                color: '#CF1322',
                float: 'left',
                padding: '3px 6px',
              }}
            />
          )}

          <p className='propertyBlockTitle'>
            <strong>{title}</strong>
          </p>

          {tip && (
            <div className='propertyBlockTip'>
              <TooltipTip
                tooltipText={tip}
                iconType='question'
                isTooltipBelow={false}
              />
            </div>
          )}
        </div>
      )}

      <div className='propertyBlockInput'>{children}</div>
    </div>
  );
};

PropertyBlock.propTypes = {
  children: PropTypes.node.isRequired,
  status: PropTypes.string,
  tip: PropTypes.string,
  title: PropTypes.string,
};

PropertyBlock.defaultProps = {
  status: undefined,
  tip: undefined,
  title: undefined,
};

export default PropertyBlock;
