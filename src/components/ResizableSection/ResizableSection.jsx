// REACT LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import ResizePanel from 'react-resize-panel';

// COMPONENTS
import { PopoverTip } from 'components';

// STYLES
import './ResizableSection.less';

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
 * @param {object} props Component props
 * @returns {ResizableSection} Component
 * @component
 * @example
 * const htmlElement = <div id='htmlElement' />;
 * const placeholder = <div>This is Placeholder!</div>;
 * const title = 'This is title';
 * const tip = 'This is tip';
 *
 * return (
 *  <div style={{ backgroundColor: "#333", display: "flex", width: '100%', height: '300px'}}>
 *    <ResizableSection
 *      title={title}
 *      placeholder={placeholder}
 *      tip={tip}
 *    >
 *      {htmlElement}
 *    </ResizableSection>
 *  </div>
 * );
 */
const ResizableSection = (props) => {
  // destructuring props
  const { placeholder, title, tip, children } = props;

  // resizable content
  const content = (
    /* section body */
    <div className='resizable-section-body'>
      {/* children (body) */}
      {children}
    </div>
  );

  // rendering component
  return (
    // resizable area
    <ResizePanel
      direction='w'
      style={{ minWidth: '18%' }}
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
                <h3><strong>{title}</strong></h3>
              </div>
            )}

            {/* tip */}
            {tip && (
              // tip component
              <div className='resizable-section-tip'>
                <PopoverTip
                  isPopoverBelow={true}
                  popoverTitle={title}
                  popoverText={tip}
                  iconType='info'
                />
              </div>
            )}
          </div>
        )}
        {children ? content : placeholder}
      </div>
    </ResizePanel>
  );
};

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
