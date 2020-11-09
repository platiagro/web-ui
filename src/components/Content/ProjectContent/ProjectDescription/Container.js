// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';

import ProjectDescription from './index';

// STATES
const mapStateToProps = (state) => {
  return {
    detail: state.projectReducer,
  };
};

const ProjectDescriptionContainer = ({ detail }) => {
  return <ProjectDescription detail={detail} />;
};

// EXPORT
export default connect(mapStateToProps, null)(ProjectDescriptionContainer);
