import ProjectsContent from 'components/Content/ProjectsContent/_';
import ProjectsDetailsContent from 'components/Content/ProjectDetailsContent/_';

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
];

export default Routes;
