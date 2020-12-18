// CORE LIBS
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { hidePreImplantationModal } from 'store/ui/actions';
import { createDeploymentRequest } from 'store/deployments/actions';
import PreImplantationModal from './PreImplantation.components'

const mapDispatchToProps = (dispatch, routerProps) => {
    return {
    handleCloseModal: () => dispatch(hidePreImplantationModal()),
    handleCreateDeployment: (project,
        experiment,
        operators
        ) => 
        dispatch(createDeploymentRequest(project,
            experiment,
            operators,
            routerProps))
    }
}

// STATES
const mapStateToProps = (state) => {
    // new project modal visible
    return {
      modalVisible: state.uiReducer.preImplantationModal.visible,

    };
  };

const PreImplantation = (props) =>{
    const {experiments, OnConfirm, OnCancel, modalVisible, handleCloseModal} = props;
    return (
        <PreImplantationModal 
            modalVisible={modalVisible}
            handleCloseModal={handleCloseModal}
            
        />
    )
}

// EXPORT
export default connect(mapStateToProps, mapDispatchToProps)(PreImplantation)