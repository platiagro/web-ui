import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';

import { NewDeploymentModal as NewDeploymentModalComponent } from 'components';

import { hideNewDeploymentModal } from 'store/ui/actions';
import { createDeploymentRequest } from 'store/deployments/actions';

import { Actions as experimentsActions } from 'store/experiments';
import { fetchTemplatesRequest } from 'store/templates/actions';
const { fetchExperimentsRequest } = experimentsActions;

const mapDispatchToProps = {
  fetchExperiments: fetchExperimentsRequest,
  fetchTemplates: fetchTemplatesRequest,
  onCancel: hideNewDeploymentModal,
  onConfirm: createDeploymentRequest,
};

const mapStateToProps = (state) => {
  return {
    visible: state.uiReducer.newDeploymentModal.visible,
    loading: state.uiReducer.newDeploymentModal.loading,
    experimentsData: state.experimentsReducer,
    templatesData: state.templatesReducer,
  };
};

/**
 * New deployment modal container
 */
function NewDeploymentModal(props) {
  const {
    visible,
    loading,
    experimentsData,
    templatesData,
    onCancel,
    onConfirm,
    fetchExperiments,
    fetchTemplates,
  } = props;

  const { projectId } = useParams();

  // did mount hook
  useEffect(() => {
    fetchExperiments(projectId);
    fetchTemplates(projectId);
  }, [fetchExperiments, fetchTemplates, projectId]);

  const handleConfirm = (selectedType, selectedUuid) => {
    let experimentId = selectedType === 'experiment' ? selectedUuid : undefined;
    let templateId = selectedType === 'template' ? selectedUuid : undefined;

    onConfirm(projectId, experimentId, templateId);
  };

  return (
    <NewDeploymentModalComponent
      visible={visible}
      loading={loading}
      experimentsData={experimentsData}
      templatesData={templatesData}
      onCancel={onCancel}
      onConfirm={handleConfirm}
    />
  );
}

NewDeploymentModal.propTypes = {
  experimentsData: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  templatesData: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        avatarColor: PropTypes.string.isRequired,
      }).isRequired,
    })
  ),
  visible: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  fetchExperiments: PropTypes.func.isRequired,
  fetchTemplates: PropTypes.func.isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewDeploymentModal)
);
