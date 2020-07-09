// REACT LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import ResizePanel from 'react-resize-panel';
import { Popover, Icon, Button } from 'antd';

// STYLES
import './ResizableSection.scss';

/**
 * Resizable section component that can be attached at right edge of the father.
 *
 * It should be given a placeholder, which can be any html element or component
 * to react. When there are no children the placeholder will be rendered.
 *
 * It can take any html element or react component as a child.
 *
 * It can receive a title and a tip.
 *
 * @component
 * @example
 * const htmlElement = <div id='htmlElement' />;
 * const placeholder = <div>This is Placeholder!</div>;
 * const title = 'This is title';
 * const tip = 'This is tip';
 *
 * return (
 *   <ResizableSection
 *     title={title}
 *     placeholder={placeholder}
 *     tip={tip}
 *   >
 *     {htmlElement}
 *   </ResizableSection>
 * );
 */
const ResizableSection = ({ placeholder, title, tip, children }) => (
  // resizable area
  <div className='resizable-area'>
    {/* resizable panel */}
    <ResizePanel
      direction='w'
      style={{ width: '20%' }}
      handleClass='customHandle'
      borderClass='customResizeBorder'
    >
      {/* section */}
      <div className='resizable-section'>
        {/* section header */}
        {(title || tip) && (
          <div className='resizable-section-header'>
            {/* title */}
            {title && (
              <div className='resizable-section-title'>
                <h3>{title}</h3>
              </div>
            )}

            {/* tip */}
            {tip && (
              <div className='resizable-section-tip'>
                <Popover
                  placement='bottomRight'
                  content={<p>{tip}</p>}
                  title={title}
                >
                  <Button type='link' style={{ color: '#262626' }}>
                    <Icon type='info-circle' style={{ fontSize: '18px' }} />
                  </Button>
                </Popover>
              </div>
            )}
          </div>
        )}
        {/* section body */}
        <div className='resizable-section-body'>
          {/* children (body) */}
          {children ? children : placeholder}
        </div>
      </div>
    </ResizePanel>
  </div>
);

// PROP TYPES
ResizableSection.propTypes = {
  /** empty placeholder: elemento html ou componente react */
  placeholder: PropTypes.node.isRequired,
  /** title: string */
  title: PropTypes.string,
  /** tip: string */
  tip: PropTypes.string,
  /** component children (body): elemento html ou componente react */
  children: PropTypes.node,
};

// DEFAULT PROPS
ResizableSection.defaultProps = {
  /** title: string */
  title: null,
  /** tip: string */
  tip: null,
  /** component children: elemento html ou componente react */
  children: null,
};

// EXPORT DEFAULT
export default ResizableSection;
