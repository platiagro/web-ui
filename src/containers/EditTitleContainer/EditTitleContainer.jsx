import PropTypes from 'prop-types';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import EditTitle from 'components/EditTitle';
import NewProjectModal from 'components/Content/ProjectsContent/NewProjectModal/Container';

import { showNewProjectModal } from 'store/ui/actions';
import { Selectors } from 'store/projects';

const { getProject } = Selectors;

/**
 * New Project Button Container.
 *
 * This component is responsible for create a logic container for new project
 * button with redux.
 */
const EditTitleContainer = (props) => {
  const { title, ...restProps } = props;

  const { projectId } = useParams();
  const dispatch = useDispatch();

  // TODO: Criar seletores com reselect -> Otimização
  /* eslint-disable-next-line */
  const project = useSelector((state) => getProject(projectId, state));

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
        handleClick={handleEditModal}
        title={title || project.name}
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
