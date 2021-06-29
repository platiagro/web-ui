import React from 'react';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';
import ResizePanel from 'react-resize-panel';

import { PopoverTip } from 'components';

import './ResizableSection.less';

const ResizableSection = ({ placeholder, title, tip, children }) => {
  return (
    <ResizePanel
      direction='w'
      style={{ width: '18%' }}
      handleClass='customHandle'
      borderClass='customResizeBorder'
    >
      <div className='resizable-section'>
        {(title || tip) && (
          <div className='resizable-section-header'>
            {title && (
              <div className='resizable-section-title'>
                <h3>
                  <strong>
                    <Tooltip placement='top' title={title}>
                      <div className='title-ellipsis'>{title}</div>
                    </Tooltip>
                  </strong>
                </h3>
              </div>
            )}

            {tip && (
              <div className='resizable-section-tip'>
                <PopoverTip
                  popoverTitle={title || ''}
                  isPopoverBelow={true}
                  popoverText={tip}
                  iconType='info'
                />
              </div>
            )}
          </div>
        )}

        {children ? (
          <div className='resizable-section-body'>{children}</div>
        ) : (
          placeholder
        )}
      </div>
    </ResizePanel>
  );
};

ResizableSection.propTypes = {
  placeholder: PropTypes.node.isRequired,
  children: PropTypes.node,
  title: PropTypes.string,
  tip: PropTypes.string,
};

ResizableSection.defaultProps = {
  children: null,
  title: null,
  tip: null,
};

export default ResizableSection;
