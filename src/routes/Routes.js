import {
  Deployment,
  JupyterLab,
  Projects,
  ProjectsDetails,
  Experiments,
  Tasks,
  Error404,
} from 'pages';

/**
 * @type {Routes}
 */
const Routes = [
  {
    path: '/',
    exact: true,
    component: Projects,
  },
  {
    path: '/projetos',
    exact: true,
    component: Projects,
  },
  {
    path: '/projetos/:projectId',
    exact: true,
    strict: true,
    component: ProjectsDetails,
  },
  {
    path: '/projetos/:projectId/experimentos/:experimentId?',
    exact: true,
    component: Experiments,
  },
  {
    path: '/projetos/:projectId/pre-implantacao/:deploymentId?',
    exact: true,
    component: Deployment,
  },
  {
    path: '/tarefas',
    exact: true,
    component: Tasks,
  },
  {
    path: '/jupyterlab/:path*',
    component: JupyterLab,
  },
  {
    path: '*',
    component: Error404,
  },
];

export default Routes;
