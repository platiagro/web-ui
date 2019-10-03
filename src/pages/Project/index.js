import React from 'react';

const Project = ({ match }) => (
  <div>
    Projeto
    {match.params.id}
  </div>
);

export default Project;
