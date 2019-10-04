import React from 'react';
import ExperimentContainer from '../../components/ExperimentContainer';
import projects from './projects_mock';

const Project = ({ match }) => (
  <ExperimentContainer details={projects[match.params.id]} />
);

export default Project;
