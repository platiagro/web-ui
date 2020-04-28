// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import NewTemplateButton from './index';

// ACTIONS
import { showNewTemplateModal } from '../../../../../../store/ui/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleShowModal: () => dispatch(showNewTemplateModal()),
  };
};

/**
 * New Template Button Container.
 * This component is responsible for create a logic container for create new
 * template button with redux.
 */
const NewTemplateButtonContainer = ({ handleShowModal }) => (
  <NewTemplateButton disabled={false} handleClick={handleShowModal} />
);

// EXPORT
export default connect(null, mapDispatchToProps)(NewTemplateButtonContainer);
