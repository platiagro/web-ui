// REACT LIBS
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// COMPONENTS
import NewTabButton from './NewTabButton';
import NewTabModal from './NewTabModal';
import Tab from './Tab';

// STYLE
import './Tabs.component.style.less';

/**
 * This component is responsible for displaying tabs.
 */
const Tabs = (props) => {
  // tab
  const {
    activeTab,
    deleteTitle,
    handleChange,
    handleDelete,
    handleDuplicate,
    handleMoveTab,
    handleRename,
    loading,
    tabs,
  } = props;
  // modal
  const {
    modalErrorMessage,
    modalItemLabel,
    modalInitialValue,
    modalRuleMessage,
    modalTitle,
    handleNewTab,
  } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const handleShowModal = () => {
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='custom-tabs'>
        <Tab
          activeTab={activeTab}
          deleteTitle={deleteTitle}
          handleChange={handleChange}
          handleDelete={handleDelete}
          handleDuplicate={handleDuplicate}
          handleMoveTab={handleMoveTab}
          handleRename={handleRename}
          loading={loading}
          tabs={tabs}
        />
        <NewTabButton disabled={false} handleClick={handleShowModal} />
        <NewTabModal
          errorMessage={modalErrorMessage}
          handleCloseModal={handleCloseModal}
          handleNewTab={handleNewTab}
          itemLabel={modalItemLabel}
          initialValue={modalInitialValue}
          ruleMessage={modalRuleMessage}
          title={modalTitle}
          visible={modalVisible}
        />
      </div>
    </DndProvider>
  );
};

// PROP TYPES
Tabs.propTypes = {
  /** active tab key */
  activeTab: PropTypes.string,
  /** delete pop confirm title */
  deleteTitle: PropTypes.string,
  /** handle tab change function */
  handleChange: PropTypes.func.isRequired,
  /** delete function to use on context menu */
  handleDelete: PropTypes.func.isRequired,
  /** duplicate function to use on context menu */
  handleDuplicate: PropTypes.func.isRequired,
  /** handle move tab function */
  handleMoveTab: PropTypes.func.isRequired,
  /** rename function to use on context menu */
  handleRename: PropTypes.func.isRequired,
  /** is loading */
  loading: PropTypes.string,
  /** modal error message */
  modalErrorMessage: PropTypes.string,
  /** modal item label */
  modalItemLabel: PropTypes.string,
  /** modal initial value */
  modalInitialValue: PropTypes.string,
  /** modal rule message */
  modalRuleMessage: PropTypes.string,
  /** modal title */
  modalTitle: PropTypes.string,
  /** tabs list */
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

// EXPORT DEFAULT
export default Tabs;
