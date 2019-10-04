import React from 'react';

const Project = ({ match }) => {
  const experiment = match.params.experimentId
    ? `Experimento ${match.params.experimentId}`
    : null;
  return (
    <div>
      Projeto&nbsp;
      {match.params.projectId}
      <br />
      {experiment}
    </div>
  );
};

export default Project;
