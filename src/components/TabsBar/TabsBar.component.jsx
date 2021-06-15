import PropTypes from 'prop-types';
import React from 'react';

import Tabs from './Tabs';
import NewTabButton from './NewTabButton';

import './TabsBar.component.style.less';

const TabsBar = ({
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
}) => {
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

TabsBar.propTypes = {
  activeTab: PropTypes.string,
  deleteTitle: PropTypes.string,
  loading: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDuplicate: PropTypes.func.isRequired,
  onMoveTab: PropTypes.func.isRequired,
  onRename: PropTypes.func.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TabsBar;
