import ProjectsContent from 'components/Content/ProjectsContent/_';
import ProjectsDetailsContent from 'components/Content/ProjectDetailsContent/_';
import ExperimentsContent from 'components/Content/ExperimentsContent/_';

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
];

export default Routes;
