import React from 'react';
import ExperimentContainer from '../../components/ExperimentContainer';
import projects from './projects_mock';

// const Project = ({ match }) => {
//   const experiment = match.params.experimentId
//     ? `Experimento ${match.params.experimentId}`
//     : null;
//   return (
//     <div>
//       Projeto&nbsp;
//       {match.params.projectId}
//       <br />
//       {experiment}
//     </div>
//   );
// };
const Project = ({ match }) => (
  <ExperimentContainer details={projects[match.params.id]} />
);

export default Project;
