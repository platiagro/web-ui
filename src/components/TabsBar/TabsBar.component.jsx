// REACT LIBS
import PropTypes from 'prop-types';
import React from 'react';

// COMPONENTS
import NewTabButton from './NewTabButton';
import Tabs from './Tabs';

// STYLE
import './TabsBar.component.style.less';

/**
 * This component is responsible for displaying tabs bar.
 */
const TabsBar = (props) => {
  const {
    activeTab,
    deleteTitle,
    loading,
    onChange,
    onClick,
    onDelete,
    onDuplicate,
    onMoveTab,
    onRename,
    tabs,
  } = props;

  return (
    <div className='custom-tabs'>
      <Tabs
        activeTab={activeTab}
        deleteTitle={deleteTitle}
        loading={loading}
        onChange={onChange}
        onDelete={onDelete}
        onDuplicate={onDuplicate}
        onMoveTab={onMoveTab}
        onRename={onRename}
        tabs={tabs}
      />
      <NewTabButton disabled={false} onClick={onClick} />
    </div>
  );
};

// PROP TYPES
TabsBar.propTypes = {
  /** active tab key */
  activeTab: PropTypes.string,
  /** delete pop confirm title */
  deleteTitle: PropTypes.string,
  /** is loading */
  loading: PropTypes.string,
  /** handle tab change function */
  onChange: PropTypes.func.isRequired,
  /** handle tab change function */
  onClick: PropTypes.func.isRequired,
  /** delete function to use on context menu */
  onDelete: PropTypes.func.isRequired,
  /** duplicate function to use on context menu */
  onDuplicate: PropTypes.func.isRequired,
  /** handle move tab function */
  onMoveTab: PropTypes.func.isRequired,
  /** rename function to use on context menu */
  onRename: PropTypes.func.isRequired,
  /** tabs list */
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

// EXPORT DEFAULT
export default TabsBar;
