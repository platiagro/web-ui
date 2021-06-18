import PropTypes from 'prop-types';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Selectors } from 'store/projects';
import EditTitle from 'components/EditTitle';
import { showNewProjectModal } from 'store/ui/actions';
import NewProjectModal from 'pages/Projects/NewProjectModal/NewProjectModalContainer';

const { getProject } = Selectors;

const projectSelector = (projectId) => (state) => {
  return getProject(projectId, state);
};

const EditTitleContainer = ({ title, ...restProps }) => {
  const { projectId } = useParams();
  const dispatch = useDispatch();

  const project = useSelector(projectSelector(projectId));

  const handleEditModal = () => {
    const record = {
      name: project.name,
      description: project.description,
      uuid: project.uuid,
    };

    dispatch(showNewProjectModal(record));
  };

  return (
    <>
      <NewProjectModal />

      <EditTitle
        {...restProps}
        title={title || project.name}
        handleClick={handleEditModal}
      />
    </>
  );
};

EditTitleContainer.propTypes = {
  title: PropTypes.string,
};

EditTitleContainer.defaultProps = {
  title: undefined,
};

export default EditTitleContainer;
