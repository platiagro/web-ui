// REACT LIBS
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import { PropertiesPanel } from 'components';

// STATES
const mapStateToProps = (state) => {
  return {
    operatorName: state.operatorReducer.name,
  };
};

const PropertiesResizableContainer = (props) => {
  const { operatorName } = props;

  return <PropertiesPanel title={operatorName} />;
};

// PROP TYPES
PropertiesResizableContainer.propTypes = {
  operatorName: PropTypes.string,
};

// DEFAULT PROPS
PropertiesResizableContainer.defaultProps = {
  operatorName: undefined,
};

// EXPORT DEFAULT
export default connect(mapStateToProps, null)(PropertiesResizableContainer);
