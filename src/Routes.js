// FIXME: Remover quando componente (deployment) estiver pronto
import React from 'react';

import ProjectsContent from 'components/Content/ProjectsContent/_';
import ProjectsDetailsContent from 'components/Content/ProjectDetailsContent/_';
import ExperimentsContent from 'components/Content/ExperimentsContent/_';
import TaskContent from 'components/Content/TasksContent/_';

// FIXME: Remover quando componente estiver pronto
const tempDeploymentComponent = () => <span>Pré-implantação placeholder</span>;

const Routes = [
  {
    path: '/',
    exact: true,
    component: ProjectsContent,
  },
  {
    path: '/projetos',
    exact: true,
    component: ProjectsContent,
  },
  {
    path: '/projetos/:projectId',
    exact: true,
    strict: true,
    component: ProjectsDetailsContent,
  },
  {
    path: '/projetos/:projectId/experimentos/:experimentId?',
    exact: true,
    component: ExperimentsContent,
  },
  {
    path: '/projetos/:projectId/pre-implantacao/:deploymentId?',
    exact: true,
    component: tempDeploymentComponent,
  },
  {
    path: '/tarefas',
    exact: true,
    component: TaskContent,
  },
];

export default Routes;
