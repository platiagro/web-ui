// REACT LIBS
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// COMPONENTS
import { DataViewButton } from 'components/Buttons';

// ACTIONS
import { fetchShowDataViewModal } from 'store/ui/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    // show data view modal
    handleClick: () => dispatch(fetchShowDataViewModal()),
  };
};

const DataViewButtonContainer = (props) => {
  // PROPS / CONSTANTS
  // destructuring props
  const { handleClick } = props;

  // button is loading
  const isLoading = false;

  // button is disabled
  const isDisabled = false;

  // rendering component
  return (
    <DataViewButton
      isLoading={isLoading}
      isDisabled={isDisabled}
      handleClick={handleClick}
    />
  );
};

DataViewButtonContainer.propTypes = {
  /** Button click handler */
  handleClick: PropTypes.func.isRequired,
};

// EXPORT DEFAULT
export default connect(null, mapDispatchToProps)(DataViewButtonContainer);
