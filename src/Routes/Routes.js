import ProjectsContent from 'components/Content/ProjectsContent/_';
import ProjectsDetailsContent from 'components/Content/ProjectDetailsContent/_';
import ExperimentsContent from 'components/Content/ExperimentsContent/_';
import TaskContent from 'components/Content/TasksContent/_';
import Error404Content from 'components/Content/Error404Content';
import { Deployment, JupyterLab, Login } from 'Pages';

/**
 * @type {Routes}
 */
const Routes = [
  {
    path: '/',
    exact: true,
    component: ProjectsContent,
  },
  {
    path: '/login',
    exact: true,
    component: Login,
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
    component: Deployment,
  },
  {
    path: '/tarefas',
    exact: true,
    component: TaskContent,
  },
  {
    path: '/jupyterlab/:path*',
    component: JupyterLab,
  },
  {
    path: '*',
    component: Error404Content,
  },
];

export default Routes;
